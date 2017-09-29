Rails.application.routes.draw do
  root 'sluglines#home'
  resources :sluglines
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
