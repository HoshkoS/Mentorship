class ApplicationController < ActionController::Base
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:hello_world]

  def hello_world
    render plain: "Hello, World!"
  end

  def authenticate_user_with_role(required_role)
    unless current_user&.send("#{required_role}?")
      render json: { error: "Access denied" }, status: :unauthorized
    end
  end
end
