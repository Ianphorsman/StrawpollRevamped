class BarVisualizer extends React.Component {
      countVotesFor(pollSelection) {
          let count = 0
          Object.keys(this.props.userPollVotes).forEach((voteId) => {
              if (this.props.userPollVotes[voteId].poll_selection_id == pollSelection.id) {
                  count++
              }
          })
          return count
      }

      renderBarFor(pollSelection) {
          return (
              <Bar
                  pollSelectionName={pollSelection.label}
                  pollSelectionYValue={pollSelection.yValue}
                  pollSelectionColor={pollSelection.color}
                  pollSelectionId={pollSelection.id}
                  vote={this.props.vote}
                  pollId={this.props.pollData.pollId}
                  pollOpen={this.props.pollData.pollOpen}
                  userParticipated={this.props.userParticipated}
                  userHasVoted={this.props.userHasVoted}
                  duplicateVotesAllowed={this.props.duplicateVotesAllowed}
                  userVotes={this.countVotesFor(pollSelection)}
                  pollVoteCount={this.props.voteCount}>

              </Bar>
          )
      }

      messages() {
          if (this.props.voteCount == 0) {
              return "No votes have been cast yet."
          } else {
              return "Total votes so far: " + this.props.voteCount + "."
          }
      }

      render () {
          return (
              <section id="bar-visualizer">
                  <h5 className="question">{this.props.pollData.question}</h5>
                  {this.props.pollData.options.map(this.renderBarFor.bind(this))}
                  <h5>{this.messages()}</h5>
              </section>
          );
      }
}


