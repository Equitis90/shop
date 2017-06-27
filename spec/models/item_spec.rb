require 'rails_helper'

RSpec.describe Item, type: :model do
  it 'should create item' do
    count = Item.count
    FactoryGirl.create(:item)
    expect(Item.count).to eq count + 1
  end

  it 'should not create item without price' do
    expect {FactoryGirl.create(:item, price: nil)}.to raise_error ActiveRecord::RecordInvalid
  end

  it 'should not create item without title' do
    expect {FactoryGirl.create(:item, title: nil)}.to raise_error ActiveRecord::RecordInvalid
  end

  it 'should not create item without description' do
    expect {FactoryGirl.create(:item, description: nil)}.to raise_error ActiveRecord::RecordInvalid
  end

  it 'should not create item without image' do
    expect {FactoryGirl.create(:item, image: nil)}.to raise_error ActiveRecord::RecordInvalid
  end

  it 'should not create item without gender' do
    expect {FactoryGirl.create(:item, gender: nil)}.to raise_error ActiveRecord::RecordInvalid
  end

  it 'should not create item without vendor' do
    expect {FactoryGirl.create(:item, vendor: nil)}.to raise_error ActiveRecord::RecordInvalid
  end

  it 'should not create item without stock' do
    expect {FactoryGirl.create(:item, stock: nil)}.to raise_error ActiveRecord::RecordInvalid
  end
end
