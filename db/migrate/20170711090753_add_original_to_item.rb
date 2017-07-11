class AddOriginalToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :original, :boolean, :null => false, :default => false
  end
end
