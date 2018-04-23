module API
  module V1
    class Authentication < Grape::API
      include API::V1::Defaults

      namespace :authentication do
        desc 'Log in'
        params do
          requires :email, type: String
          requires :password, type: String        
        end
        post do
          command = AuthenticateUser.call(params[:email], params[:password])

          if command.success?
            render auth_token: command.result
          else
            render error: command.errors
          end
        end

      end
    end
  end
end