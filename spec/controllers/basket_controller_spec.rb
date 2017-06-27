require 'rails_helper'
require 'json'

RSpec.describe BasketController, type: :controller do
  it 'adds new item to basket' do
    item = Item.first
    get :update, params: {add: true, amount: '1',id: item.id}, session: {cart: {items: {}, count: 0, sum: 0}.with_indifferent_access}
    expected = {items: {"#{item.id}": {count: '1', price: item.price, sum: item.price, title: item.title} }, count:'1', sum: item.price.to_s}.to_json
    expect(response.body).to eq expected
  end

  it 'removes an item from basket' do
    item = Item.first
    get :update, params: {add: true, amount: '1',id: item.id}, session: {cart: {items: {}, count: 0, sum: 0}.with_indifferent_access}
    get :update, params: {delete: true, id: item.id}
    expected = {items: {}, count:'0', sum: '0.0'}.to_json
    expect(response.body).to eq expected
  end

  it 'destroys basket' do
    item = Item.first
    get :update, params: {add: true, amount: '1', id: item.id}, session: {cart: {items: {}, count: 0, sum: 0}.with_indifferent_access}
    expected = {items: {"#{item.id}": {count: '1', price: item.price, sum: item.price, title: item.title} }, count:'1', sum: item.price.to_s}.to_json
    expect(response.body).to eq expected
    get :destroy, params: {id: 1}
    expected = {items: {}, count: 0, sum: 0}.to_json
    expect(response.body).to eq expected
  end

  it 'creates new order and sends a mail to merchant' do
    item = Item.first
    get :update, params: {add: true, amount: '1', id: item.id}, session: {cart: {items: {}, count: 0, sum: 0}.with_indifferent_access}
    expected = {items: {"#{item.id}": {count: '1', price: item.price, sum: item.price, title: item.title} }, count:'1', sum: item.price.to_s}.to_json
    expect(response.body).to eq expected
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count
    get :order, params:{phone: '0665555555'}
    expect(ActionMailer::Base.deliveries.count).to eq mail_count + 1
  end
end
