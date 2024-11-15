Rails.application.routes.draw do
  get 'greetings', to: 'application#hello_world'
end
