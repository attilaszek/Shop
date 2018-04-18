class Category < ApplicationRecord
  validates :name, length: {in: 2..20}
  has_ancestry
end
