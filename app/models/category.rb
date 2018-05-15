class Category < ApplicationRecord
  validates :name, length: {in: 2..20}
  has_ancestry :orphan_strategy => :destroy

  has_many :products, dependent: :destroy

  after_commit :flush_cache

  class << self
    def cached_categories_by_parent(parent_id)
      p_id = parent_id ? parent_id : ''

      Rails.cache.fetch("categories_for_parent_id_"+p_id.to_s, expires_in: 30.second) do
        p "***** " + parent_id.to_s   # DEBUG
        if parent_id.present?
          category = Category.find(parent_id)
          category.children.to_a
        else
          Category.where(ancestry: nil).to_a
        end
      end
    end
  end

  private

  def flush_cache
    Rails.cache.delete_matched("categories_for_parent_id_*")
  end
end
