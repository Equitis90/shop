require 'rails_helper'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

RSpec.feature "Users", type: :feature, js: true do
  scenario 'user open main page' do
    visit '/'

    find_by_id('cart').has_content?
  end

  scenario 'user make an order' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "В корзину")]')
    all_buttons[0].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    all_buttons[1].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    all_buttons[2].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    all_buttons[4].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    find(:xpath, '//button[contains(text(), "Просмотреть корзину")]').click
    fill_in 'phone', :with => '0665555555'
    find(:xpath, '//button[contains(text(), "Заказать")]').click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count + 1
  end

  scenario 'user add items to cart then clear it' do
    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "В корзину")]')
    all_buttons[0].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    all_buttons[1].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    all_buttons[2].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    all_buttons[4].click
    find(:xpath, '//button[contains(text(), "Добавить и продолжить")]').click
    find(:xpath, '//button[contains(text(), "Очистить корзину")]').click

    expect(page).to have_no_selector(:xpath, '//button[contains(text(), "Просмотреть корзину")]')
  end

  scenario 'user make an order with one click button' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "В корзину")]')
    all_buttons[0].click
    find(:xpath, '//button[contains(text(), "Оформить заказ")]').click
    fill_in 'phone', :with => '0665555555'
    find(:xpath, '//button[contains(text(), "Заказать")]').click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count + 1
  end

  scenario 'user do not fills phone field in order dialog' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "В корзину")]')
    all_buttons[0].click
    find(:xpath, '//button[contains(text(), "Оформить заказ")]').click
    fill_in 'phone', :with => '06655555'
    find(:xpath, '//button[contains(text(), "Заказать")]').click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count
  end

  scenario 'user requests callback' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "Обратный звонок")]')
    all_buttons[0].click
    fill_in 'name', :with => 'John'
    fill_in 'phone', :with => '0665555555'
    all(:xpath, '//button[contains(text(), "Обратный звонок")]')[1].click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count + 1
  end

  scenario 'user dismissed callback' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "Обратный звонок")]')
    all_buttons[0].click
    fill_in 'name', :with => 'John'
    fill_in 'phone', :with => '0665555555'
    find(:xpath, '//button[contains(text(), "Отменить")]').click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count
  end

  scenario 'user do not fills name field to callback' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "Обратный звонок")]')
    all_buttons[0].click
    fill_in 'name', :with => ''
    fill_in 'phone', :with => '0665555555'
    all(:xpath, '//button[contains(text(), "Обратный звонок")]')[1].click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count
  end

  scenario 'user do not fills phone fields to callback' do
    ENV['EMAIL_TARGET'] = 'test@test.com'
    mail_count = ActionMailer::Base.deliveries.count

    visit '/'
    all_buttons = all(:xpath, '//button[contains(text(), "Обратный звонок")]')
    all_buttons[0].click
    fill_in 'name', :with => 'John'
    fill_in 'phone', :with => '0665555'
    all(:xpath, '//button[contains(text(), "Обратный звонок")]')[1].click
    sleep 1

    expect(ActionMailer::Base.deliveries.count).to eq mail_count
  end
end
