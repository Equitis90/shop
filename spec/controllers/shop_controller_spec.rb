require 'rails_helper'

RSpec.describe ShopController, type: :controller do
  it 'render index template on html request' do
    get :index
    expect(response).to render_template 'index'
  end

  it 'return json with items on json request' do
    items = Item.order(:id).to_json
    get :index, format: :json
    expect(response.body).to eq items
  end

  it 'return json depends on gender selection on json request' do
    items = Item.where(gender: :women).order(:id).to_json
    get :index, params: {gender: :women}, format: :json
    expect(response.body).to eq items
    items = Item.where(gender: :men).order(:id).to_json
    get :index, params: {gender: :men}, format: :json
    expect(response.body).to eq items
  end

  it 'render about page' do
    get :about
    expect(response).to render_template 'about'
  end
end
