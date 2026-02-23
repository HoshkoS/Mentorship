# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  respond_to :json

  def google_oauth2
    binding.pry
    token = params[:authenticity_token]
    user_info = fetch_google_user_info(token)

    if user_info
      user = User.find_or_create_by(email: user_info[:email]) do |u|
        u.name = user_info[:name]
        u.provider = 'google'
        u.uid = user_info[:sub]
        u.password = Devise.friendly_token[0, 20]
      end

      if user.persisted?
        sign_in(user, store: false)
        render json: { message: 'Login successful', user: user }, status: :ok
      else
        render json: { error: 'Unable to save user' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid token or Google data' }, status: :unauthorized
    end
  end

  def failure
    # binding.pry
    render json: { error: 'Invalid token or Google data' }, status: :unauthorized
  end

  private

  def fetch_google_user_info(token)
    response = RestClient.get('https://oauth2.googleapis.com/tokeninfo', params: { id_token: token })
    JSON.parse(response.body, symbolize_names: true)
  rescue RestClient::ExceptionWithResponse
    nil
  end
end
