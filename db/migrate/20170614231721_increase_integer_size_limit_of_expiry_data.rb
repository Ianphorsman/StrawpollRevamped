class IncreaseIntegerSizeLimitOfExpiryData < ActiveRecord::Migration[5.0]
  def change
    change_column :polls, :lifespan, :integer, :limit => 8
  end
end
