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

      pollOpenMessage() {
          if (this.props.pollData.pollOpen) {
              return "Poll Open"
          } else {
              return "Poll Closed"
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
                  <div id="card-footer" className="card-footer flex-row">
                      <div className="xs">
                          <p>{this.props.voteCount}</p>
                          <label className="text-muted">Votes Cast</label>
                      </div>
                      <div className="xs">
                          <p>{this.pollOpenMessage()}</p>
                          <label className="text-muted">{this.props.pollData.lifespan}</label>
                      </div>
                      <div className="xs share-link">
                          <p>{this.props.shareLink}</p>
                          <label className="text-muted">Poll Url</label>
                      </div>
                      <div className="xs">
                          <button type="button" onClick={this.props.toggleModal.bind(null)}>
                              <i className="fa fa-pie-chart" preserveAspectRatio="xMidYMid"></i>
                          </button>
                          <label className="text-muted">View Graph</label>
                      </div>
                  </div>
              </section>
          );
      }
}


