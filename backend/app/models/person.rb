class Person < ApplicationRecord
  has_one_attached :photo
  has_many :movies, foreign_key: :director_id

  validates :first_name, presence: true, length: { maximum: 255 }
  validates :last_name, presence: true, length: { maximum: 255 }
  validates :birthdate, presence: true
end
