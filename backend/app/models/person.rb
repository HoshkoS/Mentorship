class Person < ApplicationRecord
  has_one_attached :photo
  has_many :movies, foreign_key: :director_id
end
