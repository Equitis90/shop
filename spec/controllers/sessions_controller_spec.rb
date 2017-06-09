require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before(:all) do
    ENV['ADMIN_USERNAME'] = 'john'
    ENV['ADMIN_PASS'] = 'joespassword'
  end

  it 'render login page' do
    get :new
    expect(response).to render_template 'new'
  end

  it 'authenticates user with valid parameters' do
    get :create, params: {user: {username: 'john', password: 'joespassword'}}
    expect(response).to redirect_to admin_index_path
    expect(session[:current_user]).to be_truthy
  end

  it 'refuse to authenticate user with invalid parameters' do
    get :create, params: {user: {username: 'jon', password: 'snow'}}
    expect(response).to render_template 'new'
    expect(flash[:notice]).to eq 'Неверный логин или пароль'
    expect(session[:current_user]).to be_falsey
  end

  it 'log out current user' do
    get :create, params: {user: {username: 'john', password: 'joespassword'}}
    expect(response).to redirect_to admin_index_path
    expect(session[:current_user]).to be_truthy
    get :destroy, params: {id: 1}
    expect(response).to redirect_to root_path
    expect(session[:current_user]).to be_falsey
  end
end
