class ShopController < ApplicationController
  def index
    @items = Item.all
    if params[:vendor] && params[:vendor] != []
      @items = @items.where(vendor: params[:vendor])
    end
    if params[:gender] && params[:gender] != ''
      @items = @items.where(gender: params[:gender])
    end

    respond_to do |format|
      format.html
      format.json { render json: @items.order(:id) }
    end
  end

  def about
  end
end
