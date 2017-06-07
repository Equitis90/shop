class BasketController < ApplicationController

  respond_to :json

  def update
    if params[:add]
      item = Item.where(id: params[:id]).first
      item_id = item.id.to_s
      if session[:cart]['items'][item_id]
        session[:cart]['items'][item_id]['count'] = (session[:cart]['items'][item_id]['count'].to_i + 1).to_s
        session[:cart]['items'][item_id]['sum'] = (session[:cart]['items'][item_id]['sum'].to_f + item.price).to_s
      else
        session[:cart]['items'][item_id] = {count: '1', price: item.price, sum: item.price, title: item.title}
      end
      session[:cart]['sum'] = (session[:cart]['sum'].to_f + item.price).to_s
      session[:cart]['count'] = (session[:cart]['count'].to_i + 1).to_s
    elsif params[:delete]
      item_id = params[:id].to_s
      sum = session[:cart]['items'][item_id]['sum'].to_f
      count = session[:cart]['items'][item_id]['count'].to_i
      session[:cart]['sum'] = (session[:cart]['sum'].to_f - sum).to_s
      session[:cart]['count'] = (session[:cart]['count'].to_i - count).to_s
      session[:cart]['items'].delete(item_id)
    end

    render :json => session[:cart]
  end

  def destroy
    render :json => session[:cart] = {items:{}, count: 0, sum: 0}
  end

  def order
    cart = session[:cart]
    OrderMailer.order_mail(params[:phone], cart).deliver_now

    render :json => session[:cart] = {items:{}, count: 0, sum: 0}
  end
end
