class ShopController < ApplicationController
  def index
    page = params[:page] || 1
    @vendor = []
    if params[:brand] && Item.where(vendor: params[:brand]).first
      @items = Item.where(vendor: params[:brand]).page(1).per(12).order(:id)
      @vendor = [params[:brand]]
    else
      @items = Item.page(page).per(12).order(:id)
      if params[:vendor] && params[:vendor] != []
        @items = @items.where(vendor: params[:vendor])
      end
      if params[:gender] && params[:gender] != ''
        @items = @items.where(gender: params[:gender])
      end
    end

    @last_page = @items.last_page?

    respond_to do |format|
      format.html
      format.json { render json: {items: @items, last_page: @last_page} }
    end
  end

  def about
  end

  def delivery
  end

  def select_locale
    session[:locale] = params[:language] == 'RU' ? :ru : :uk
    redirect_to(:back)
  end

  def callback
    OrderMailer.callback_mail(params[:phone], params[:name]).deliver_now
  end

  def legal_notes

  end

  def site_verification
    render :text => 'google-site-verification: google472039a46e7969fd.html'
  end
end
