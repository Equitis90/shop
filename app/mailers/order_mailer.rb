class OrderMailer < ApplicationMailer
  def order_mail(phone, cart)
    @phone = phone
    @cart = cart
    mail(to: ENV['EMAIL_TARGET'], subject: 'Новый заказ')
  end

  def callback_mail(phone, name)
    @phone = phone
    @name = name
    mail(to: ENV['EMAIL_TARGET'], subject: 'Новый запрос на перезвон')
  end
end
