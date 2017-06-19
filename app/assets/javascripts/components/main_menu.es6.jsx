class MainMenu extends React.Component {

    listPoll(poll) {
        return (
            <li>
                <a
                    type="button"
                    onClick={this.props.getPoll.bind(this, poll.id)}>
                    {poll.question}
                </a>
            </li>
        )
    }

    getLightSwitchClass() {
        if (this.props.light) {
            return "light-on"
        } else {
            return "light-off"
        }
    }

  render () {
      return(
          <header data-light={this.getLightSwitchClass()} className="fixed-top">
              <div className="navbar">
                <h1>Strawpoll
                    <span className="text-muted">Create and share here</span>
                    <span className="text-muted smiles">:)</span>
                    <button
                        type="button"
                        onClick={this.props.toggleLightSwitch.bind(null)}
                        id="light-switch"
                        className={this.getLightSwitchClass()}>
                        <i className="fa fa-lightbulb-o"></i>
                    </button>
                </h1>
              </div>
          </header>
      )
  }
}


