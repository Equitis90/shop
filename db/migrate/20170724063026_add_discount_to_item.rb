class AddDiscountToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :discount, :integer, :null => false, :default => 0
  end
end
