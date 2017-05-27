class CreatePolls < ActiveRecord::Migration[5.0]
  def change
    create_table :polls do |t|
      t.integer   :user_id
      t.string    :name
      t.integer   :lifespan
      t.integer   :votes_per_person
      t.integer   :total_votes
      t.integer   :votes_required_per_person
      t.boolean   :multiple_votes_allowed
      t.boolean   :duplicate_votes_allowed

      t.timestamps
    end
  end
end
