class ShopController < ApplicationController
  def index
    @items = Item.order(:id)
    if params[:vendor] && params[:vendor] != []
      @items = @items.where(vendor: params[:vendor])
    end
    if params[:gender] && params[:gender] != ''
      @items = @items.where(gender: params[:gender])
    end

    respond_to do |format|
      format.html
      format.json { render json: @items }
    end
  end

  def about
  end
end
