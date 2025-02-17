# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def after_sign_up_path_for(_resource)
    ''
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    end
  end
end
