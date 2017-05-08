class AdminController < ApplicationController
  before_action :authentication_required!
  def index
  end

  def to_index
    redirect_to admin_index_url
  end
end
