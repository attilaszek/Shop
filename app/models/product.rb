class Product < ApplicationRecord
  belongs_to :category

  validates :name, length: {in: 2..20}
  validates :price, presence: true
end
