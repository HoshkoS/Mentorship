class ChangeMoviesTable < ActiveRecord::Migration[7.0]
  def change
    change_table :movies do |t|
      t.change :title, :string, limit: 255, null: false
      t.date :release_date, null: false
      t.change :genre, :string, limit: 255, null: false
      t.references :director, foreign_key: { to_table: :people }, null: false
    end
  end
end
