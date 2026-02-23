class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  def self.authenticate(email, password)
    user = User.find_for_authentication(email: email)
    user.try(:valid_password?, password) ? user : nil
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if session["devise.oauth_data"].present?
        provider = session["devise.oauth_data"]["provider"]
        if provider == "google_oauth2"
          if data = session["devise.oauth_data"]
            user.email = data["info"]["email"] if user.email.blank?
          end
        end
      end
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.extra.id_info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end
end
