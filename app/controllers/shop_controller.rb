class ShopController < ApplicationController
  def index
    if params[:gender] && params[:gender] != ''
      @items = Item.where(gender: params[:gender]).order(:id)
    else
      @items = Item.order(:id)
    end

    respond_to do |format|
      format.html
      format.json { render json: @items }
    end
  end

  def about
  end
end
