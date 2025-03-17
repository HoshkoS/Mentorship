class ChangeDirectorIdNullConstraint < ActiveRecord::Migration[7.0]
  def change
    change_column_null :movies, :director_id, true
  end
end
