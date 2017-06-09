FactoryGirl.define do
  factory :item do |item|
    item.sequence(:title) { Faker::Commerce.product_name }
    description Faker::Lorem.paragraph
    item.sequence(:price) { Faker::Commerce.price }
    item.sequence(:gender) { [:men, :women].sample }
    image Faker::Avatar.image("my-own-slug", "320x150")
  end
end