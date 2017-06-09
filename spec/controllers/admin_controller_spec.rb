require 'rails_helper'

RSpec.describe AdminController, type: :controller do
  it 'should redirect unauthorized visitor to login page' do
    get :index
    expect(response).to redirect_to new_session_path
  end

  it 'should redirect unauthorized user to login page' do
    get :to_index
    expect(response).to redirect_to new_session_path
  end

  it 'should show admin page for authorized user' do
    get :index, session: {current_user: true}
    expect(response).to render_template 'index'
  end

  it 'should redirect authorized user to admin page' do
    get :to_index, session: {current_user: true}
    expect(response).to redirect_to admin_index_path
  end
end
