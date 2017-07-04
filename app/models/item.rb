class Item < ApplicationRecord
  enum gender: [:women, :men, :unisex]

  validates :image, :description, :gender, :price, :title, :vendor, presence: true
end
