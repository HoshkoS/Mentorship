class Movie < ApplicationRecord
  has_one_attached :poster
  has_many :movie_watchlists
  has_many :watchlists, through: :movie_watchlists
  belongs_to :person, foreign_key: :director_id
end
