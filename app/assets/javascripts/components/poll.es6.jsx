class Poll extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPie: false
        }
    }


    componentDidMount() {
        this.setState({ showPie: true })
    }

    renderPieChart() {
        if (this.state.showPie) {
            return (
                <PieChart
                    pollData={this.props.pollData}
                    userHasVoted={this.props.userHasVoted}
                    light={this.props.light}>
                </PieChart>
            )
        }
    }

    renderWithPieChart() {
        return(<section className="card h-100">
            {this.renderPieChart()}
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
            <div id="chart-container" className="card-img-bottom row">
                <div id="pie-chart-container" className="col-9 my-auto">
                    <canvas id="pie-chart"></canvas>
                </div>
            </div>
            <p className="card-footer">{this.props.shareLink}</p>
        </section>)
    }

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
                shareLink={this.props.shareLink}>
            </BarVisualizer>
        </section>
    );
  }
}


