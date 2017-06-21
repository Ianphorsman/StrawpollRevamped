class Modal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPie: false
        }
    }

    componentDidMount() {
        if (this.props.showModal) {
            this.setState({ showPie: true })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.showModal && prevState.showPie === false) {
            this.setState({ showPie: true })
        }
    }

    getModalClass() {
        if (this.props.showModal) {
            return "modal fade show"
        } else {
            return "modal fade"
        }
    }

    renderPieChart() {
        if (this.state.showPie) {
            return (
                <PieChart
                    pollData={this.props.pollData}
                    userHasVoted={this.props.userHasVoted}
                    light={this.props.light}
                    lightClass={this.props.lightClass}>
                </PieChart>
            )
        }
    }
  render () {
    return (
        <div className={this.getModalClass()} id="modal" tabIndex="-1" aria-hidden={!this.props.showModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div data-light={this.props.lightClass()} className="modal-header">
                        <h3>{this.props.pollData.question}</h3>
                        <button type="button" data-dismiss="modal"><i className="fa fa-close"></i></button>
                    </div>
                    <div data-light={this.props.lightClass()} className="modal-body">
                        <div id="chart-container">
                            <div id="pie-chart-container">
                                <canvas id="pie-chart"></canvas>
                            </div>
                        </div>
                        {this.renderPieChart()}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}


