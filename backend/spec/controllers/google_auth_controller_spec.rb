require 'rails_helper'

RSpec.describe 'GoogleAuthController', type: :request do
  include Devise::Test::IntegrationHelpers

  describe 'POST /google_auth/google_oauth2' do
    let(:user_info) do
      {
        email: 'test@example.com',
        sub: '1234567890'
      }
    end

    let(:mock_response) { instance_double(RestClient::Response, body: user_info.to_json) }

    before do
      allow(RestClient).to receive(:get).and_return(mock_response)
    end

    context 'when token is valid' do
      it 'creates a new user and signs them in' do
        post '/google_auth/google_oauth2', params: { token: 'valid_token' }, as: :json

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['status']['code']).to eq(200)
        expect(User.find_by(email: user_info[:email])).not_to be_nil
      end

      it 'returns user data in response' do
        post '/google_auth/google_oauth2', params: { token: 'valid_token' }, as: :json

        json_response = JSON.parse(response.body)
        expect(json_response['data']['email']).to eq(user_info[:email])
      end
    end

    context 'when token is invalid' do
      before do
        allow(RestClient).to receive(:get).and_raise(RestClient::Unauthorized)
      end

      it 'returns an unauthorized error' do
        post '/google_auth/google_oauth2', params: { token: 'invalid_token' }, as: :json

        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['error']).to eq('Invalid token or Google data')
      end
    end
  end
end
