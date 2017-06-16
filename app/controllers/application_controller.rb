class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :init_cart
  before_action :set_locale, :except => [:routing_error]

  ApplicationNotAuthenticated = Class.new(StandardError)

  rescue_from ApplicationNotAuthenticated do
    respond_to do |format|
      format.json { render json: { errors: [message: "401 Not Authorized"] }, status: 401 }
      format.html do
        flash[:notice] = "Вы не авторизированы для просмотра этой страницы!"
        redirect_to new_session_path
      end
      format.any { head 401 }
    end
  end

  def init_cart
    session[:cart] = {items:{}, count: 0, sum: 0} unless session[:cart]
  end

  def authentication_required!
    session[:current_user] || raise(ApplicationNotAuthenticated)
  end

  def set_locale
    I18n.locale = session[:locale] || I18n.default_locale
  end
end
