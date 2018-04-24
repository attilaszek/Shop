module API
  module V1
    class Authentication < Grape::API
      include API::V1::Defaults

      namespace :authentication do
        desc 'Log in'
        params do
          requires :email, type: String
          requires :password, type: String
          requires :admin, type: Boolean
        end
        post "login" do
          command = AuthenticateUser.call(params[:email], params[:password], params[:admin])

          if command.success?
            {auth_token: command.result}
          else
            error!(command.errors, 404)
          end
        end

        desc 'Return user'
        get do
          authenticate_request
          current_user
        end

        desc 'Sign up'
        params do
          requires :email, type: String
          requires :password, type: String
          requires :password_confirmation, type: String
          optional :first_name, type: String
          optional :last_name, type: String
        end
        post "signup" do
          if params[:password] == params[:password_confirmation]
            @user = User.new({
              email: params[:email],
              password: params[:password],
              first_name: params[:first_name],
              last_name: params[:last_name],
              admin: false,
            })
            unless @user.save
              error!(@user.errors.messages, 404)
            end
          else
            error!({password_confirmation: "invalid password confirmation"}, 404)
          end
        end

      end
    end
  end
end