class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category_id, :image_b64
end