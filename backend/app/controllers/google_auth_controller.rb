class GoogleAuthController < ApplicationController
  respond_to :json

  def google_oauth2
    token = params[:token]
    user_info = fetch_google_user_info(token)

    if user_info
      user = User.find_or_create_by(email: user_info[:email]) do |u|
        u.provider = 'google'
        u.uid = user_info[:sub]
        u.password = Devise.friendly_token[0, 20]
      end

      if user.persisted?
        sign_in user
        render json: {
          status: { code: 200, message: 'Signed in successfully' },
          data: UserSerializer.new(user).serializable_hash[:data][:attributes]
        }
      else
        render json: { error: 'Unable to save user' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid token or Google data' }, status: :unauthorized
    end
  end

  def failure
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  private

  def fetch_google_user_info(token)
    response = RestClient.get('https://oauth2.googleapis.com/tokeninfo', params: { id_token: token })
    JSON.parse(response.body, symbolize_names: true)
  rescue RestClient::ExceptionWithResponse
    nil
  end
end
