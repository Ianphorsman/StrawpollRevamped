class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  ActionCable.server.config.allowed_request_origins = [
      'http://takeapoll.xyz',
'http://www.takeapoll.xyz',
      'www.takeapoll.xyz',
      '127.0.0.1',
      'http://localhost:3000',
      '10.0.1.31:3000',
      '10.0.1.13:3000',
      '10.0.1.9:3000'
  ]

  def user_participated?
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id]) || Poll.last
    if user.votes.where(poll_id: poll.id).length >= poll.votes_per_person
      true
    else
      false
    end
  end
  helper_method :user_participated?

  def user_has_voted?
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id]) || Poll.last
    if user.votes.where(poll_id: poll.id).length >= poll.votes_required_per_person
      true
    else
      false
    end
  end
  helper_method :user_has_voted?

  def share_link poll_id
    return "takeapoll.xyz/home/show/#{poll_id}"
  end
  helper_method :share_link

  def default_react_params
    if Poll.all.count > 0 then latest_poll_id = Poll.last.id else latest_poll_id = 0 end
    @react_params = {
      :latestPollId           => latest_poll_id,
      :pollContext            => 'newPoll',
      :pollId                 => 1,
      :full_access_to_stream  => false,
      :pollData              => {
          :pollId => 0
      },
      :voteCount              => 0,
      :shareLink              => "/home/show/0",
      :userPollVotes          => {},
      :question               => "",
      :options                => {
          0 => '', 1 => '', 2 => '', 3 => ''
      },
      :pollExpiresIn          => "",
      :pollExpiryUnit         => "",
      :numVotes               => "",
      :votesRequired          => "",
      :duplicateVotesAllowed  => false,
      :totalVotes             => "",
      :light                  => true,
      :showModal              => false
    }
  end
  helper_method :default_react_params

  def update_react_params_with_user_data &block
    user = authenticate_or_create_user
    if user.nil?
      @react_params[:userPolls] = []
      @react_params[:userVotes] = []
      @react_params[:userId] = user.id
    else
      @react_params[:userVotes] = user.votes
      @react_params[:userId] = user.id
      if user.votes.count > 0
        @react_params[:userPolls] = user.polls.map do |poll|
          {
              :id => poll.id,
              :question => poll.name,
              :voteCount => poll.vote_count
          }
        end.sort_by { |poll| -poll[:voteCount] }.first(10)
      else
        @react_params[:userPolls] = []
      end
    end
    yield if block_given?
  end
  helper_method :update_react_params_with_user_data

  def update_react_params_with_popular_polls
    if Poll.all.count > 1
      @react_params[:popularPolls] = Poll.all.sort_by { |poll| poll.vote_count }.last(10).map do |poll|
        {
            :id => poll.id,
            :question => poll.name,
            :voteCount => poll.vote_count
        }
      end
    end
  end
  helper_method :update_react_params_with_popular_polls

  def update_react_params_with_poll_data user, poll
    if user_has_voted?
      @react_params[:pollData] = poll.poll_data
      @react_params[:voteCount] = poll.vote_count
    else
      @react_params[:pollData] = poll.poll_data_by_user user
      @react_params[:voteCount] = poll.vote_count_of_user user
    end
  end
  helper_method :update_react_params_with_poll_data

  def update_react_params_poll_context context
    @react_params[:pollContext] = context
  end
  helper_method :update_react_params_poll_context

  private

  def authenticate_or_create_user
    ip_addr = request.remote_ip
    device = request.user_agent

    hashable_user_string = "#{ip_addr}_#{device}"

    hashed_user = Digest::SHA256.new.hexdigest(hashable_user_string)

    user = User.find_by_hashed_identity(hashed_user)
    if user.nil?
      user = User.create({ hashed_identity: hashed_user })
    end
    user
  end
end
