module API  
  module V1
    class Categories < Grape::API
      include API::V1::Defaults

      resource :categories do
        desc "Return all categories"
        get "", root: :categories do
          Category.all
        end

        desc "Return a category"
        params do
          requires :id, type: String, desc: "ID of the 
            category"
        end
        get ":id", root: "category" do
          Category.where(id: permitted_params[:id]).first!
        end

        desc "Create a category"
        params do
          requires :name, type: String, desc: "Name of the new category"
          optional :description, type: String, desc: "Short description of the new category"
          optional :ancestry, type: Integer, desc: "ID of parent category (if exists)"
        end
        post do
          Category.create!({
            name: params[:name],
            description: params[:description],
            ancestry: params[:ancestry]
          })
        end

        desc "Update a category"
        params do
          requires :id, type: String, desc: "ID of the category"
          requires :name, type: String, desc: "Name of the category"
          requires :description, type: String, desc: "Short description of the category"
          requires :ancestry, type: Integer, desc: "ID of parent category (if exists)"
        end
        put ':id' do
          Category.find(params[:id]).update({
            name: params[:name],
            description: params[:description],
            ancestry: params[:ancestry]
          })
        end

        desc "Delete a category"
        params do
          requires :id, type: String, desc: "ID of the category"
        end
        delete ':id' do
          Category.find(params[:id]).destroy
        end
      end
    end
  end
end  