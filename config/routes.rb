Rails.application.routes.draw do
  get 'shop/index'

  resources :items
  root 'shop#index'
end
