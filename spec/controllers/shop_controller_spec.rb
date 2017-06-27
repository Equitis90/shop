require 'rails_helper'

RSpec.describe ShopController, type: :controller do
  it 'render index template on html request' do
    get :index
    expect(response).to render_template 'index'
  end

  it 'return json with items on json request' do
    items = JSON.parse(Item.order(:id).to_json)
    get :index, format: :json
    expect(JSON.parse(response.body)['items']).to eq items
  end

  it 'return json depends on gender selection on json request' do
    items = JSON.parse(Item.where(gender: :women).order(:id).to_json)
    get :index, params: {gender: :women}, format: :json
    expect(JSON.parse(response.body)['items']).to eq items
    items = JSON.parse(Item.where(gender: :men).order(:id).to_json)
    get :index, params: {gender: :men}, format: :json
    expect(JSON.parse(response.body)['items']).to eq items
  end

  it 'render about page' do
    get :about
    expect(response).to render_template 'about'
  end
end
