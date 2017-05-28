# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class PollsChannel < ApplicationCable::Channel
  def subscribed
    #stream_from "polls_" + data[:pollId]
  end

  def follow(data) # { pollData => {}, pollId => int }
    stop_all_streams
    user = User.find_by_id(data[:userId])
    poll = Poll.find_by_id(data[:pollId])
    user_votes = user.votes.where(poll_id: poll.id).count
    votes_required = poll.votes_required_per_person
    if user_votes >= votes_required
      stream_from "polls_#{poll.id}"
    else
      stream_from "polls_#{poll.id}_user_#{user.id}"
    end
  end

  def unfollow
    stop_all_streams
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end