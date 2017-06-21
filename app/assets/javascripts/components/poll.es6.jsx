class Poll extends React.Component {

  render () {
    return (
        <section className="h-100">
            <BarVisualizer
                pollData={this.props.pollData}
                voteCount={this.props.voteCount}
                userPollVotes={this.props.userPollVotes}
                userHasVoted={this.props.userHasVoted}
                duplicateVotesAllowed={this.props.duplicateVotesAllowed}
                userParticipated={this.props.userParticipated}
                vote={this.props.vote}
                light={this.props.light}
                lightClass={this.props.lightClass}
                shareLink={this.props.shareLink}
                toggleModal={this.props.toggleModal}
                copyToClipboard={this.props.copyToClipboard}>
            </BarVisualizer>
        </section>
    );
  }
}


