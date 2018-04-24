class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, password, admin)
    @email = email
    @password = password
    @admin = admin
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :email, :password, :admin

  def user
    user = User.find_by_email(email)
    unless admin && (user && !user.admin)
      return user if user && user.authenticate(password)
    end

    if user
      if admin && !user.admin
        errors.add :email, 'No admin rights'
      else
        errors.add :password, 'Invalid password'
      end
    else
      errors.add :email, 'Not registered'
    end
    nil
  end
end