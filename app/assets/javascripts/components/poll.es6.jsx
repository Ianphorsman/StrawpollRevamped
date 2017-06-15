class Poll extends React.Component {


  render () {
    return (
        <section>
            <PieChart
                pollData={this.props.pollData}
                userHasVoted={this.props.userHasVoted}>
            </PieChart>
            <BarVisualizer
                pollData={this.props.pollData}
                voteCount={this.props.voteCount}
                userPollVotes={this.props.userPollVotes}
                userHasVoted={this.props.userHasVoted}
                duplicateVotesAllowed={this.props.duplicateVotesAllowed}
                userParticipated={this.props.userParticipated}
                vote={this.props.vote}>
            </BarVisualizer>
            <p>{this.props.shareLink}</p>
        </section>
    );
  }
}


