class Movie < ApplicationRecord
  has_one_attached :poster
  has_many :movie_watchlists
  has_many :watchlists, through: :movie_watchlists
  belongs_to :person, foreign_key: :director_id, optional: true

  validates :title, presence: true, length: { maximum: 255 }
  validates :genre, presence: true, length: { maximum: 255 }
  validates :release_date, presence: true
end
