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

    vote() {
    }

    gatherPollParams() {
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

  render () {

    return(
        <div>
            <MainMenu
                changeContext={this.changeContext.bind(this)}
                getPoll={this.getPoll.bind(this)}
                userPolls={[]}
                popularPolls={[]}>
            </MainMenu>
           <NewPoll
                changeContext={this.changeContext.bind(this)}
                updateFormField={this.updateFormField.bind(this)}
                updateSelectionField={this.updateSelectionField.bind(this)}
                increaseOptionCount={this.increaseOptionCount.bind(this)}
                createPoll={this.createPoll.bind(this)}
                question={this.state.question}
                options={this.state.options}
                numVotes={this.state.numVotes}
                duplicateVotesAllowed={this.state.duplicateVotesAllowed}
                totalVotes={this.state.totalVotes}
                pollExiresIn={this.state.pollExpiresIn}
                pollExpiryUnit={this.state.pollExpiryUnit}>
           </NewPoll>
        </div>
    )
  }

}

