class CreateEntrepeneurs < ActiveRecord::Migration
  def change
    create_table :entrepeneurs do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
