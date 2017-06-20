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
              <section id="bar-visualizer" className="card h-100 w-100">
                  <div className="question card-header">
                      <h5>{this.props.pollData.question}</h5>
                  </div>
                  <div className="card-block d-flex">
                      <ul className="list-group list-group-flush flex-column w-100">
                          {this.props.pollData.options.map(this.renderBarFor.bind(this))}
                      </ul>
                  </div>
                  <div data-light={this.props.lightClass()} id="card-footer" className="card-footer">
                      <p className="card-text votes-cast">{this.messages()}</p>
                      <p className="share-link">{this.props.shareLink}</p>
                  </div>
              </section>
          );
      }
}


