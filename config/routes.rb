Rails.application.routes.draw do
  get 'admin/index'

  get 'sessions/new'
  get 'sessions/create'

  get 'shop/index'
  get 'shop/about'
  get 'shop/delivery'
  get 'basket/order'
  get 'shop/callback'
  get 'shop/legal_notes'
  get 'shop/info'
  get '/google472039a46e7969fd.html' => 'shop#site_verification'
  get '/google472039a46e7969fd.html' => 'shop#site_verification'
  get 'site_map' => 'shop#site_map'
  get 'site_map_http' => 'shop#site_map_http'
  post 'shop/select_locale'

  resources :sessions, only: [:create, :new, :destroy]

  get '/admin' => 'admin#index', :as => 'admin'
  get 'admin/to_index'

  resources :items
  resources :basket
  root 'shop#index'
end
