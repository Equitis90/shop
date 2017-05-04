class AddGenderToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :gender, :integer
  end
end
