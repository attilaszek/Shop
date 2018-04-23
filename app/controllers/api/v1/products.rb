module API  
  module V1
    class Products < Grape::API
      include API::V1::Defaults

      before { authenticate_request }

      resource :products do
        desc "Return products by category"
        params do
          optional :category_id, type: Integer, desc: "ID of parent category"
        end
        get "", root: :products do
          if params[:category_id].present?
            category = Category.find(params[:category_id])
            categories = category.descendant_ids.to_a
            categories << category.id
            Product.where("category_id IN (?)", categories)
          else
            Product.all
          end
        end

        desc "Return a product"
        params do
          requires :id, type: String, desc: "ID of the 
            product"
        end
        get ":id", root: "product" do
          Product.find(permitted_params[:id])
        end

        desc "Create a product"
        params do
          requires :name, type: String, desc: "Name of the new product"
          requires :price, type: Float, desc: "Price of the new product"
          optional :description, type: String, desc: "Description of the new product"
          requires :category_id, type: Integer, desc: "ID of category"
        end
        post do
          @product = Product.new({
            name: params[:name],
            price: params[:price],
            description: params[:description],
            category_id: params[:category_id]
          })
          @product.save
        end

        desc "Update a product"
        params do
          requires :id, type: String, desc: "ID of the product"
          requires :price, type: Float, desc: "Price of the product"
          requires :name, type: String, desc: "Name of the product"
          requires :description, type: String, desc: "Short description of the product"
        end
        put ':id' do
          Product.find(params[:id]).update({
            name: params[:name],
            description: params[:description],
            price: params[:price]
          })
        end

        desc "Delete a product"
        params do
          requires :id, type: String, desc: "ID of the product"
        end
        delete ':id' do
          Product.find(params[:id]).destroy
        end
      end
    end
  end
end  