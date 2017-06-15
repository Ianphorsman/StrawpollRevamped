class Poll extends React.Component {


  render () {
    return (
        <section className="card">
            <PieChart
                pollData={this.props.pollData}
                userHasVoted={this.props.userHasVoted}
                light={this.props.light}>
            </PieChart>
            <BarVisualizer
                pollData={this.props.pollData}
                voteCount={this.props.voteCount}
                userPollVotes={this.props.userPollVotes}
                userHasVoted={this.props.userHasVoted}
                duplicateVotesAllowed={this.props.duplicateVotesAllowed}
                userParticipated={this.props.userParticipated}
                vote={this.props.vote}
                light={this.props.light}>
            </BarVisualizer>
            <p className="container well">{this.props.shareLink}</p>
        </section>
    );
  }
}


