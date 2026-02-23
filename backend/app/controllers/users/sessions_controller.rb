# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed in successfully' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    end
  end
end
