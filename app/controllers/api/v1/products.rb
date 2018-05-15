require "base64"
require "csv"

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
            categories = Category.cached_categories_by_parent(params[:category_id]).map { |category| category.id }
            categories << params[:category_id]
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
          optional :image_b64, type: String, desc: "Product image decoded in base64"
        end
        post do
          return unless current_user.admin

          product = Product.where(name: params[:name]).find_or_create_by({})

          product.update({
            price: params[:price],
            description: params[:description],
            category_id: params[:category_id],
            image_b64: params[:image_b64]
          })
          product.save
        end

        desc "Update a product"
        params do
          requires :id, type: String, desc: "ID of the product"
          requires :price, type: Float, desc: "Price of the product"
          requires :name, type: String, desc: "Name of the product"
          requires :description, type: String, desc: "Short description of the product"
        end
        put ':id' do
          return unless current_user.admin
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
          return unless current_user.admin
          Product.find(params[:id]).destroy
        end

        desc "Upload product from file"
        params do
          requires :file_b64, type: String, desc: "Base64 encoded csv file"
          requires :category_id, type: Integer, desc: "ID of category"
        end
        post "upload" do
          file = Base64.decode64(params[:file_b64][21..-1])
          
          begin
            rows = CSV.parse(file)[1..-1]
          rescue
            error!({csv_file: "Invalid format"}, 404)
          end

          rows.each do |row|
            return unless current_user.admin

            product = Product.where(name: row[0]).find_or_create_by({})

            product.update({
              price: row[1],
              description: row[2],
              category_id: params[:category_id],
              image_b64: "data:image/jpeg;base64," + Base64.encode64(open(row[3]) { |io| io.read })
            })
            product.save
          end

          true

        end
      end
    end
  end
end  