class Category < ApplicationRecord
  validates :name, length: {in: 2..20}
  has_ancestry :orphan_strategy => :destroy

  has_many :products, dependent: :destroy
end
