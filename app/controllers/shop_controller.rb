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

  def to_basket
    item = Item.where(id: params[:item_id]).first
    item_id = item.id.to_s
    if session[:cart]['items'][item_id]
      session[:cart]['items'][item_id]['count'] = (session[:cart]['items'][item_id]['count'].to_i + 1).to_s
      session[:cart]['items'][item_id]['sum'] = (session[:cart]['items'][item_id]['sum'].to_f + item.price).to_s
    else
      session[:cart]['items'][item_id] = {count: '1', price: item.price, sum: item.price, title: item.title}
    end

    session[:cart]['sum'] = (session[:cart]['sum'].to_f + item.price).to_s
    session[:cart]['count'] = (session[:cart]['count'].to_i + 1).to_s

    respond_to do |format|
      format.json { render json: session[:cart] }
    end
  end

  def delete_basket
    respond_to do |format|
      format.json { render json: session[:cart] = {items:{}, count: 0, sum: 0} }
    end
  end

  def delete_from_basket
    item_id = params[:id].to_s
    sum = session[:cart]['items'][item_id]['sum'].to_f
    count = session[:cart]['items'][item_id]['count'].to_i
    session[:cart]['sum'] = (session[:cart]['sum'].to_f - sum).to_s
    session[:cart]['count'] = (session[:cart]['count'].to_i - count).to_s
    session[:cart]['items'].delete(item_id)

    respond_to do |format|
      format.json { render json: session[:cart] }
    end
  end

  def order
    #cart = session[:cart]
    #OrderMailer.order_mail(params[:phone], cart).deliver_now

    respond_to do |format|
      format.json { render json: session[:cart] = {items:{}, count: 0, sum: 0} }
    end
  end
end
