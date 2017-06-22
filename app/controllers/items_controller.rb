class ItemsController < ApplicationController
  before_action :authentication_required!

  respond_to :json

  def index
    page = params[:page] || 1
    items = Item.page(page).per(20).order(:id)
    last_page = items.last_page?
    @resp = {items: items, last_page: last_page}

    respond_with @resp
  end

  def update
    item = Item.find(params["id"])
    item.update_attributes(item_params)
    respond_with item
  end

  def create
    respond_with Item.create(item_params)
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  private

  def item_params
    params.require(:item).permit(:id, :title, :description, :price, :gender, :image, :vendor, :stock)
  end
end
