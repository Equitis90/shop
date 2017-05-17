Rails.application.routes.draw do
  get 'admin/index'

  get 'sessions/new'
  get 'sessions/create'

  get 'shop/index'
  get 'shop/about'
  get 'shop/to_basket'
  get 'shop/delete_basket'
  get 'shop/delete_from_basket'
  get 'shop/order'

  resources :sessions, only: [:create, :new, :destroy]

  get '/admin' => 'admin#index', :as => 'admin'
  get 'admin/to_index'

  resources :items
  root 'shop#index'
end
