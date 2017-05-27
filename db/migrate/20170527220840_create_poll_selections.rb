class CreatePollSelections < ActiveRecord::Migration[5.0]
  def change
    create_table :poll_selections do |t|
      t.integer   :user_id
      t.integer   :poll_id
      t.string    :name
      t.integer   :vote_count
      t.string    :color
      t.timestamps
    end
  end
end
