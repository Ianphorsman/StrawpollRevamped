class HomeController < ApplicationController

  before_action :default_react_params

  def index
    update_react_params_with_user_data
    update_react_params_with_popular_polls
  end

  def show
    user = authenticate_or_create_user
    poll = Poll.find_by_id(params[:poll_id])
    update_react_params_with_user_data
    update_react_params_with_poll_data user, poll
    update_react_params_poll_context 'mount'
    @react_params[:shareLink] = share_link(poll.id)
  end

end
