class Watchlist < ApplicationRecord
  belongs_to :user
  has_many :movie_watchlists
  has_many :movies, through: :movie_watchlists

  validates :title, presence: true, length: { maximum: 255 }
  validates :user_id, presence: true
  validates :watched, inclusion: { in: [true, false] }
  validates :is_private, inclusion: { in: [true, false] }
end
