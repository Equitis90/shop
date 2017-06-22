class AddStockToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :stock, :boolean, :null => false, :default => true
  end
end
