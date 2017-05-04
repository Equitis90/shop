class Item < ApplicationRecord
  #has_attached_file :image,
  #                  :storage => :database,
  #                  :column => 'image'
  enum gender: [:women, :men]

  validates :image, :description, :gender, :price, :title, presence: true
end
