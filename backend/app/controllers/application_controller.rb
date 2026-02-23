class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:hello_world]

  def hello_world
    render plain: "Hello, World!"
  end
end
