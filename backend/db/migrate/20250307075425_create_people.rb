class CreatePeople < ActiveRecord::Migration[7.0]
  def change
    create_table :people do |t|
      t.string :first_name, limit: 255
      t.string :last_name, limit: 255
      t.date :birthdate
      t.text :biography

      t.timestamps
    end
  end
end
