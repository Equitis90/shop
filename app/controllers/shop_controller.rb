class ShopController < ApplicationController
  def index
    page = params[:page] || 1
    @vendor = []
    @original = 'license'
    if params[:brand] && Item.where(vendor: params[:brand]).first
      @items = Item.where(vendor: params[:brand]).page(1).per(12).order(:id)
      @vendor = [params[:brand]]
      if params[:original] && params[:original] != ''
        @items = @items.where(original: params[:original] == 'original' ? true : false)
        @original = params[:original]
      else
        @items = @items.where(original: false)
      end
    else
      @items = Item.page(page).per(12).order(:id)
      if params[:vendor] && params[:vendor] != []
        @items = @items.where(vendor: params[:vendor])
        @vendor = params[:vendor]
      end
      if params[:gender] && params[:gender] != ''
        @items = @items.where(gender: params[:gender])
      end
      if params[:title] && params[:title] != ''
        @items = @items.where('title ilike ?', "%#{params[:title]}%")
      end
      if params[:original] && params[:original] != ''
        @items = @items.where(original: params[:original] == 'original' ? true : false)
      else
        @items = @items.where(original: false)
      end
      if params[:discount] && params[:discount] != ''
        @items = @items.where('discount > 0')
      end
    end

    @last_page = @items.last_page?

    respond_to do |format|
      format.html
      format.json { render json: {items: @items, last_page: @last_page, original: @original} }
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

  def site_map
    render :text => "https://www.perfumes.net.ua\n
                     https://www.perfumes.net.ua/delivery\n
                     https://www.perfumes.net.ua/about\n
                     https://www.perfumes.net.ua/legal_notes"
  end

  def site_map_http
    render :text => "http://www.perfumes.net.ua\n
                     http://www.perfumes.net.ua/delivery\n
                     http://www.perfumes.net.ua/about\n
                     http://www.perfumes.net.ua/legal_notes"
  end

  def info

  end

  def info2

  end
end
