class OrderMailer < ApplicationMailer
  def order_mail(phone, cart)
    @phone = phone
    @cart = cart
    mail(to: ENV['EMAIL_TARGET'], subject: 'Новый заказ')
  end
end
