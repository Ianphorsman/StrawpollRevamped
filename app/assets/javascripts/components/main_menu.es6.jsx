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

  render () {
      return(
          <header className="container-fluid fixed-top">
              <div className="navbar container">
                <h1>Strawpoll</h1>
              </div>
          </header>
      )
  }
}


