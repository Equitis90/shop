class AddVendorToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :vendor, :string, null: false, default: ''
  end
end
