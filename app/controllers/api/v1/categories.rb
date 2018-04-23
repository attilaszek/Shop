module API  
  module V1
    class Categories < Grape::API
      include API::V1::Defaults

      before { authenticate_request }

      resource :categories do
        desc "Return categories by parent"
        params do
          optional :parent_id, type: Integer, desc: "ID of parent category"
        end
        get "", root: :categories do
          if params[:parent_id].present?
            category = Category.find(params[:parent_id])
            category.children
          else
            Category.where(ancestry: nil)
          end
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
          @category = Category.new({
            name: params[:name],
            description: params[:description],
            parent_id: params[:ancestry]
          })
          @category.save
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