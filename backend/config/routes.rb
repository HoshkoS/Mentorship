Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'sign_up'
  },
  controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  post 'google_auth/google_oauth2', to: 'google_auth#google_oauth2'
  get 'greetings', to: 'application#hello_world'
  resources :movies, only: [:index, :show, :create]
end
