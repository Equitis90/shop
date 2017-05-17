class OrderMailer < ApplicationMailer
  def order_mail(phone, cart)
    @phone = phone
    @cart = cart
    mail(to: ENV['EMAIL'], subject: 'Новый заказ')
  end
end
