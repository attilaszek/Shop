class Product < ApplicationRecord
  belongs_to :category

  validates :name, length: {in: 2..20}, uniqueness: true
  validates :price, presence: true
end
