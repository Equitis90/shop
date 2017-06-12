require 'rails_helper'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

RSpec.feature "Users", type: :feature, js: true do
  scenario 'user open main page' do
    visit '/'

    find_by_id('cart').has_content?
  end


end
