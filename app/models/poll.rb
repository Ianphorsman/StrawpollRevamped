class Poll < ApplicationRecord

  has_many :poll_selections

  validates_presence_of :user_id, :votes_per_person, :lifespan

  def vote_count
    self.poll_selections.map(&:vote_count).inject(&:+)
  end

  def poll_data(user_participated=true)
    data = {}
    if user_participated
      data[:options] = self.poll_selections.map do |selection|
        {
            :label => selection.name,
            :yValue => selection.vote_count,
            :color => selection.color,
            :id => selection.id
        }
      end
      data[:voteCount] = self.vote_count
    else
      data[:options] = self.poll_selections.map do |selection|
        {
            :label => selection.name,
            :yValue => selection.vote_count,
            :color => selection.color,
            :id => selection.id
        }
      end
      data[:voteCount] = 0
    end
    if ((Time.now.utc - self.created_at) > self.lifespan)
      data[:pollOpen] = false
      data[:voteCount] = self.vote_count
    else
      data[:pollOpen] = true
    end
    data[:pollId] = self.id
    data[:question] = self.name
    data[:lifespan] = self.get_poll_lifespan
    data[:duplicate_votes_allowed] = self.duplicate_votes_allowed
    data[:options] = data[:options].sort_by { |obj| obj[:label] }
    data
  end

  def poll_data_by_user user
    data = {}
    data[:options] = self.poll_selections.map do |selection|
      {
          :label => selection.name,
          :yValue => user.votes.where(poll_selection_id: selection.id).count,
          :color => selection.color,
          :id => selection.id
      }
    end
    data[:voteCount] = user.votes.where(poll_id: self.id).count
    if ((Time.now.utc - self.created_at) > self.lifespan)
      data[:pollOpen] = false
    else
      data[:pollOpen] = true
    end
    data[:pollId] = self.id
    data[:question] = self.name
    data[:duplicate_votes_allowed] = self.duplicate_votes_allowed
    data[:options] = data[:options].sort_by { |obj| obj[:label] }
    data
  end

  def vote_count_of_user user
    user.votes.where(poll_id: self.id).count
  end


  def get_poll_lifespan
    lifespan = self.lifespan - (Time.now.utc - self.created_at)
    if lifespan < 0
      "Closed"
    elsif lifespan / 1.minute < 60
      "Closes in #{(lifespan / 1.minute).round} min"
    elsif lifespan / 1.hour < 24
      "Closes in #{(lifespan / 1.hour).round} hr"
    elsif lifespan / 1.day < 1000
      "Closes in #{(lifespan / 1.day).round} days"
    else
      "Does not expire"
    end
  end

end