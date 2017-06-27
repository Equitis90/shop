class Item < ApplicationRecord
  enum gender: [:women, :men, :unisex]

  validates :image, :description, :gender, :price, :title, :vendor, :stock, presence: true
end
