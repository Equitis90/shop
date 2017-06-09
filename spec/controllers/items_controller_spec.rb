require 'rails_helper'

RSpec.describe ItemsController, type: :controller do
  it 'return list of items as json to authorized user' do
    items = Item.order(:id).to_json
    get :index, session:{current_user: true}, format: :json
    expect(response.body).to eq items
  end

  it 'redirect unauthorized user to login page' do
    get :index
    expect(response).to redirect_to new_session_path
  end

  it 'update item if user authorized' do
    item = Item.first
    new_params = FactoryGirl.build(:item)
    new_params.id = item.id
    get :update, params:{id: item.id, item: JSON.parse(new_params.to_json)}, session:{current_user: true}, format: :json
    item = JSON.parse(Item.where(id: item.id).first.to_json)
    resp = JSON.parse(response.body)
    expect(resp).to eq item
  end

  it 'refuse to update item if user not authorized' do
    item = Item.first
    new_params = FactoryGirl.build(:item)
    err = {errors: [{message: '401 Not Authorized'}]}
    get :update, params:{id: item.id, item: new_params}, format: :json
    expect(response.body).to eq err.to_json
  end

  it 'create item if user authorized' do
    new_params = FactoryGirl.build(:item)
    last_id = Item.last.id
    get :create, params:{item: JSON.parse(new_params.to_json)}, session:{current_user: true}, format: :json
    item = JSON.parse(Item.where(id: last_id + 1).first.to_json)
    resp = JSON.parse(response.body)
    expect(resp).to eq item
  end

  it 'refuse to create item if user not authorized' do
    new_params = FactoryGirl.build(:item)
    err = {errors: [{message: '401 Not Authorized'}]}
    get :create, params:{item: new_params}, format: :json
    expect(response.body).to eq err.to_json
  end

  it 'destroy item if user authorized' do
    item = Item.first
    item_json = JSON.parse(item.to_json)
    get :destroy, params:{id: item.id}, session:{current_user: true}, format: :json
    resp = JSON.parse(response.body)
    expect(resp).to eq item_json
  end

  it 'refuse to destroy item if user not authorized' do
    item = Item.first
    err = {errors: [{message: '401 Not Authorized'}]}
    get :destroy, params:{id: item.id}, format: :json
    expect(response.body).to eq err.to_json
  end
end
