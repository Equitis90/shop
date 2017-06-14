vendors = [
    'Hugo Boss',
    'Kenzo',
    'Paco Rabanne',
    'Gucci',
    'Trussardi',
    'Lanvin',
    'Bond',
    'Givenchy',
    'Moschino',
    'Yves Saint Laurent',
    'Nina Ricci',
    'Tom Ford',
    'Versace',
    'Roberto Cavalli',
    'Lancome',
    'Dolce&Gabbana',
    'Dior',
    'Chanel',
    'Carolina Herrera',
    'Calvin Klein',
    'Cacharel',
    'Burberry',
    'Beyonce',
    'Bvlgari',
    'Angel Schlesser',
    'Armand Basi',
    'Armani',
    'Vin Diesel'
]
FactoryGirl.define do
  factory :item do |item|
    item.sequence(:title) { Faker::Commerce.product_name }
    description Faker::Lorem.paragraph
    item.sequence(:price) { Faker::Commerce.price }
    item.sequence(:gender) { [:men, :women].sample }
    item.sequence(:vendor) { vendors.sample }
    image Faker::Avatar.image("my-own-slug", "320x150")
  end
end