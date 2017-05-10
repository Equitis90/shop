class ShopController < ApplicationController
  def index
    if params[:gender]
      items = Item.where(gender: params[:gender])
    else
      items = Item.all
    end
    @items = items
  end

  def about

  end
end
