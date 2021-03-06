class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :gender
      t.boolean :win
      t.boolean :played
      t.string :email
      t.string :profilepic
      t.integer :entrepeneur_id
      t.text :comment
      t.string :oauth_token
      t.datetime :oauth_expires_at

      t.timestamps
    end
  end
end
