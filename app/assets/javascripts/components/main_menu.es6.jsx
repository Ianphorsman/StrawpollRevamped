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
          <header className="fixed-top">
              <div className="navbar">
                <h1>Strawpoll
                    <span className="text-muted">Create and share here</span>
                    <span className="text-muted smiles">:)</span>
                </h1>
              </div>
          </header>
      )
  }
}


