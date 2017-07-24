class Item < ApplicationRecord
  enum gender: [:women, :men, :unisex]

  validates :image, :description, :gender, :price, :title, :vendor, presence: true
  validates_numericality_of :discount, :in => 0..100
end
