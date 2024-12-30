class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def hello_world
    render plain: "Hello, World!"
  end
end
