class BasketController < ApplicationController

  respond_to :json

  def update
    if params[:add]
      item = Item.where(id: params[:id]).first
      item_id = item.id.to_s
      discount = item.discount
      if params[:amount] && params[:amount] != '' && params[:amount].to_i > 0
        amount = params[:amount].to_i
        price = discount == 0 ? item.price.round(2) : (item.price - (item.price * discount * 0.01)).round(2)
        item_sum = price * amount
        if session[:cart]['items'][item_id]
          session[:cart]['items'][item_id]['count'] = (session[:cart]['items'][item_id]['count'].to_i + amount).to_s
          session[:cart]['items'][item_id]['sum'] = (session[:cart]['items'][item_id]['sum'].to_f + item_sum).to_s
        else
          session[:cart]['items'][item_id] = {count: params[:amount], price: price, sum: item_sum, title: item.title}
        end
        session[:cart]['sum'] = (session[:cart]['sum'].to_f + item_sum).to_s
        session[:cart]['count'] = (session[:cart]['count'].to_i + amount).to_s
      end
    elsif params[:delete]
      item_id = params[:id].to_s
      sum = session[:cart]['items'][item_id]['sum'].to_f
      cart_sum = session[:cart]['sum'].to_f
      count = session[:cart]['items'][item_id]['count'].to_i
      session[:cart]['sum'] = ((cart_sum - sum).abs).to_s
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
