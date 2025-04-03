class AddIsPrivateToWatchlists < ActiveRecord::Migration[7.0]
  def change
    add_column :watchlists, :is_private, :boolean
  end
end
