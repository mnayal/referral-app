Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :invitation
    end
  end

  # Forward all non api requests to home controller to be handled by react router in App component
  get '*page', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
  root 'home#index'
end
