class WatchlistsController < ApplicationController
  before_action :set_watchlist, only: [:show, :update, :destroy]
  before_action -> { authenticate_user_with_role(:user) }

  def index
    @watchlists = Watchlist.all
    render json: @watchlists
  end

  def show
    render json: @watchlist, include: :movies
  end

  def create
    @watchlist = Watchlist.new(watchlist_params)
    @watchlist.user_id = current_user.id

    if @watchlist.save
      render json: @watchlist, status: :created
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  def update
    if @watchlist.update(watchlist_params)
      render json: @watchlist
    else
      render json: @watchlist.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @watchlist.destroy
    head :no_content
  end

  def add_movie
    movie = Movie.find(params[:movie_id])
    if movie
      @watchlist.movies << movie
      render json: @watchlist, include: :movies
    else
      render json: { error: 'Movie not found' }, status: :not_found
    end
  end

  private

  def set_watchlist
    @watchlist = Watchlist.find(params[:id])
  end

  def watchlist_params
    params.require(:watchlist).permit(:title, :watched, :is_private)
  end
end
