class ShopController < ApplicationController
  def index
    page = params[:page] || 1
    @items = Item.page(page).per(12).order(:id)
    if params[:vendor] && params[:vendor] != []
      @items = @items.where(vendor: params[:vendor])
    end
    if params[:gender] && params[:gender] != ''
      @items = @items.where(gender: params[:gender])
    end

    @last_page = @items.last_page?

    respond_to do |format|
      format.html
      format.json { render json: {items: @items, last_page: @last_page} }
    end
  end

  def about
  end
end
