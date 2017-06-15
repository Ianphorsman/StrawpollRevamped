class Main extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            ...props,
        }
    }

    componentDidMount() {
        this.pollSubscription(this)
    }

    updateFormField(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    updateSelectionField(option, event) {
        const options = {
            ...this.state.options,
            [option]: event.target.value
        }
        this.setState({ options })
    }

    getPoll(pollId) {
        const successHandler = (data) => {
        }
        const errorHandler = (data) => {
        }
        $.ajax({
            method: 'GET',
            dataType: 'json',
            headers: {
                'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')
            },
            contentType: 'application/json',
            accepts: 'application/json',
            url: '/poll/show' + pollId + '.json',
            success: successHandler.bind(this),
            error: errorHandler.bind(this)
        })
    }

    createPoll() {
        const successHandler = (data) => {
            console.log(data)
            this.setState({
                pollId: data.pollData.pollId,
                pollData: data.pollData,
                userPollVotes: data.userPollVotes,
                shareLink: data.shareLink
            }, function () {
                this.setState({ pollContext: 'showPoll' })
                this.updateSubscription()
            })
            this.resetPollParams()
        }
        const errorHandler = (data) => {
        }
        const params = this.gatherPollParams()
        $.ajax({
            method: 'POST',
            dataType: 'json',
            headers: {
                'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')
            },
            contentType: 'application/json',
            accepts: 'application/json',
            url: '/poll/create',
            data: JSON.stringify(params),
            success: successHandler.bind(this),
            error: errorHandler.bind(this)

        })
    }

    vote(pollSelectionId, pollId) {
        let successHandler = (data) => {
            if (data.head !== 'Already voted') {
                this.setState({
                    userParticipated: data.userParticipated,
                    userHasVoted: data.userHasVoted,
                    userPollVotes: data.userPollVotes,
                    userVotes: Object.assign(this.state.userVotes, data.vote)
                })
            }
        }
        $.ajax({
            method: 'POST',
            headers: {
                'X-CSRF-Token': $("meta[name='csrf-token']").attr('content')
            },
            dataType: 'json',
            contentType: 'application/json',
            accepts: 'application/json',
            url: '/poll/' + pollId + '/vote/' + pollSelectionId,
            success: successHandler.bind(this)
        })
    }

    gatherPollParams() {
        return {
            "utf8": "checked",
            "question": this.state.question,
            "poll_expires_in": this.state.pollExpiresIn,
            "poll_expiry_unit": this.state.pollExpiryUnit,
            "duplicate_votes_allowed": this.state.duplicateVotesAllowed,
            "num_votes": this.state.numVotes,
            "options": this.state.options
        }
    }

    resetPollParams() {
        this.setState({
            pollExpiresIn: 7,
            pollExpiryUnit: 'never',
            duplicateVotesAllowed: false,
            numVotes: 1,
            options: {
                0: '',
                1: '',
                2: '',
                3: ''
            },
            question: ''
        })
    }

    subscribeToPoll(that) {
    }

    changeContext(context) {
        this.setState({
            context: context
        })
    }

    lightenDarkenColor (col, amt) {
        let usePound = false;
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        let num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    allOptionsFilled() {
        let numEmpty = 0
        for (let key in Object.keys(this.state.options)) {
            if (this.state.options[key].length == 0) {
                numEmpty++
            }
        }
        if (numEmpty <= 1) {
            return true
        } else {
            return false
        }
    }

    increaseOptionCount() {
        if (this.allOptionsFilled()) {
            let nextPair = {[Object.keys(this.state.options).length]: ''}
            let copy = Object.assign({}, this.state.options)
            copy[Object.keys(this.state.options).length] = ''
            this.setState({
                options: copy
            })
        }
    }

    updateDuplicateVotesAllowed(value) {
        this.setState({
            duplicateVotesAllowed: value
        })
    }

    updatePollData(data) {
        let copy = Object.assign({}, this.state.pollData)
        copy = data
        this.setState({ pollData: copy })
    }

    pollSubscription(that) {
        this.pollStream = App.cable.subscriptions.create("PollsChannel", {
            pollData: that.state.pollData,
            pollId: that.state.pollData.pollId,
            connected: function() {
                setTimeout(() => {
                    this.perform('follow', {
                        pollData: this.pollData,
                        pollId: this.pollId,
                        userId: that.state.userId
                    })
                }, 1000)
            },
            disconnected: function() {
                this.perform('unfollow')
            },
            received: function(data) {
                if (that.state.pollId == data.pollId) {
                    that.updatePollData(data.pollData)
                    that.setState({ voteCount: data.voteCount })
                } else if (data.enableAccess && !(that.fullAccessToStream)) {
                    console.log("enabling access...")
                    that.setState({ fullAccessToStream: true })
                    this.updateStream(that)
                } else {
                    console.log("Access to full poll data denied.")
                    that.updatePollData(data.pollData)
                    that.setState({ voteCount: data.voteCount })
                }
            },
            updateStream: function(that) {
                console.log("UserID:", that.state.userId)
                setTimeout(() => {
                    this.perform('follow', {
                        pollData: that.state.pollData,
                        pollId: that.state.pollData.pollId,
                        userId: that.state.userId
                    })
                }, 1000)
            }

        })
    }

    updateSubscription() {
        this.pollStream.updateStream(this)
    }

    renderPollContext() {
        if (this.state.pollContext === 'newPoll') {
            return (
                <NewPoll
                    changeContext={this.changeContext.bind(this)}
                    updateFormField={this.updateFormField.bind(this)}
                    updateSelectionField={this.updateSelectionField.bind(this)}
                    updateDuplicateVotesAllowed={this.updateDuplicateVotesAllowed.bind(this)}
                    increaseOptionCount={this.increaseOptionCount.bind(this)}
                    resetPollParams={this.resetPollParams.bind(this)}
                    createPoll={this.createPoll.bind(this)}
                    question={this.state.question}
                    options={this.state.options}
                    numVotes={this.state.numVotes}
                    duplicateVotesAllowed={this.state.duplicateVotesAllowed}
                    totalVotes={this.state.totalVotes}
                    pollExpiresIn={this.state.pollExpiresIn}
                    pollExpiryUnit={this.state.pollExpiryUnit}>
                </NewPoll>
            )
        } else if (this.state.pollContext === 'showPoll') {
            return (
                <Poll
                    pollData={this.state.pollData}
                    userHasVoted={this.state.userHasVoted}
                    voteCount={this.state.voteCount}
                    userPollVotes={this.state.userPollVotes}
                    duplicateVotesAllowed={this.state.pollData.duplicate_votes_allowed}
                    userParticipated={this.state.userParticipated}
                    vote={this.vote.bind(this)}
                    shareLink={this.state.shareLink}>
                </Poll>
            )
        } else if (this.state.pollContext === 'mount') {
            this.setState({ pollContext: 'showPoll' })
        }
    }

  render () {

    return(
        <div>
            <MainMenu
                getPoll={this.getPoll.bind(this)}
                userPolls={this.state.userPolls}
                popularPolls={this.state.popularPolls}
                changeContext={this.changeContext.bind(this)}>
            </MainMenu>
            {this.renderPollContext()}
            <section id="chart-container">
                <canvas id="pie-chart"></canvas>
            </section>
        </div>
    )
  }

}

