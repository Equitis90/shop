class SessionsController < ApplicationController
  def new
    @site_user = User.new
  end

  def create
    site_user_params = params.require(:user)

    @site_user = User.new
                     .tap { |su| su.username = site_user_params[:username] }
                     .tap { |su| su.password = site_user_params[:password] }

    if @site_user.login_valid?
      session[:current_user] = true
      redirect_to admin_index_path
    else
      @site_user.password = nil
      flash[:notice] = 'Неверный логин или пароль'
      render 'new'
    end
  end

  def destroy
    reset_session
    redirect_to root_path
  end
end
