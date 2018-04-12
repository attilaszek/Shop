class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :ancestry
end