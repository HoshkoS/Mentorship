class MoviesController < ApplicationController
  respond_to :json
  before_action :set_movie, only: [:show]
  before_action -> { authenticate_user_with_role(:user) }, only: [:create]

  def index
    @movies = Movie.all
    render json: @movies.map { |movie| movie_json(movie) }
  end

  def show
    render json: movie_json(@movie)
  end

  def create
    @movie = Movie.new(movie_params)
    if params[:movie][:poster]
      @movie.poster.attach(params[:movie][:poster])
    end

    if @movie.save
      render json: movie_json(@movie), status: :created
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  private

  def set_movie
    @movie = Movie.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Movie not found' }, status: :not_found
  end

  def movie_params
    params.require(:movie).permit(:title, :description, :genre, :release_date, :director_id, :poster)
  end

  def movie_json(movie)
    {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      release_date: movie.release_date,
      director_id: movie.director_id,
      poster_url: movie.poster.attached? ? url_for(movie.poster) : nil
    }
  end
end
