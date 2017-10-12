Rails.application.routes.draw do
  root to: 'pages#index'

  resources :scrapes, only: %w(show) do
    resource :summary, only: %w(show), controller: 'scrapes/summary'
  end

  namespace :api do
    namespace :v1 do
      resources :scrapes, only: %w(index destroy create)
    end
  end
end
