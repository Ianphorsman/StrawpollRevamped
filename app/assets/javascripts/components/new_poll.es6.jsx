class NewPoll extends React.Component {

    /* check if fields are filled */

    filledOption(option) {
        if (this.props.options[option].length > 0) {
            return true
        } else {
            return false
        }
    }


    /* validations */

    validQuestion() {
        if (this.props.question.length > 0) {
            return true
        } else {
            return false
        }
    }

    validOption(option) {
        let duplicateExists = false
        let duplicateValue = this.props.options[option]
        for (let key in Object.keys(this.props.options)) {
            if (
                this.props.options[key] === duplicateValue &&
                this.props.options[key].length > 0 &&
                key < option
            ) {
                duplicateExists = true
            }
        }
        if (this.filledOption(option) && duplicateExists == false) {
            return true
        } else {
            return false
        }
    }

    validOptions() {
        let count = 0
        let duplicatesExist = false
        let mappedValues = {}
        for (let key in this.props.options) {
            const option = this.props.options[key]
            if (option.length > 0) {
                count++
            }
            if (option in mappedValues && option.length > 0) {
                duplicatesExist = true
            } else {
                mappedValues[option] = true
            }
        }
        if (count > 1 && duplicatesExist == false) {
            return true
        } else {
            return false
        }
    }

    validPollExpiresIn() {
        if (this.props.pollExpiresIn > 0) {
            return true
        } else {
            return false
        }
    }

    validNumVotesAllowed() {
        if (this.props.numVotes > 0) {
            return true
        } else {
            return false
        }
    }


    /* className logic */

    presentQuestion() {
        if (this.validQuestion()) {
            return "form-control filled"
        } else {
            return "form-control"
        }
    }


    presentPollExpiresIn() {
        if (this.validPollExpiresIn()) {
            return "form-control filled poll-option"
        } else {
            return "form-control"
        }
    }

    presentNumVotesAllowed() {
        if (this.validNumVotesAllowed()) {
            return "form-control filled poll-option"
        } else {
            return "form-control"
        }
    }


    presentOption(option) {
        const validOption = this.validOption(option)
        const filledOption = this.filledOption(option)
        if (validOption && filledOption) {
            return "form-control option filled"
        } else if (!(validOption) && filledOption) {
            return "form-control option error"
        } else {
            return "form-control option"
        }
    }

    createPollEnabled() {
        if (this.validQuestion() && this.validOptions()) {
            return "btn create-poll"
        } else {
            return "btn create-poll disabled"
        }
    }

    /* Field Helpers */

    addSelectionFields(option) {
        return (
            <div className="form-group">
                <input
                    type="text"
                    name={"option_" + option}
                    onChange={this.props.updateSelectionField.bind(null, option[0])}
                    onFocus={this.props.increaseOptionCount.bind(null)}
                    className={this.presentOption(option)}
                    placeholder="Enter poll option"
                />
            </div>
        )
    }

    addPollExpiry() {
        return (
            <div className="form-group">
                <label className="col-xs-6 no-pad">Close poll in </label>
                <div className="col-xs-4 no-pad">
                    <input
                        className={this.presentPollExpiresIn()}
                        onChange={this.props.updateFormField.bind(null, 'pollExpiresIn')}
                        type="text"
                        name="poll-expires-in"
                        placeholder="7"
                    />
                </div>
                <div className="col-xs-2 no-pad">
                    <select
                        onChange={this.props.updateFormField.bind(null, 'pollExpiryUnit')}
                        className="form-control"
                        name="poll-expiry-unit">
                        <option value="minutes">minutes</option>
                        <option value="hours">hours</option>
                        <option value="days">days</option>
                        <option value="never">never</option>
                    </select>
                </div>
            </div>
        )
    }

    addVotesPerPerson() {
        return (
            <div className="form-group">
                <label className="no-pad col-xs-6">Votes allowed per person: </label>
                <div className="col-xs-4 no-pad">
                    <input
                        className={this.presentNumVotesAllowed()}
                        onChange={this.props.updateFormField.bind(null, 'numVotes')}
                        type="text"
                        name="num-votes"
                        placeholder="1"
                    />
                </div>
            </div>
        )
    }

    addDuplicateVotesAllowed() {
        return (
            <div className="form-group">
                <label className="col-xs-6 no-pad">Duplicate Votes Allowed: </label>
                <div className="col-xs-2 col-xs-offset-4 no-pad">
                    <input
                        onChange={this.props.updateFormField.bind(null, 'duplicateVotesAllowed')}
                        type="checkbox"
                        name="duplicate-votes-allowed"
                    />
                </div>
            </div>
        )
    }

    addFormSubmit() {
        return (
            <div className="form-group">
                <div>
                    <a
                        type="button"
                        className={this.createPollEnabled()}
                        onClick={this.props.createPoll.bind(null)}>
                        Create
                    </a>
                </div>
            </div>
        )
    }



  render () {
    return(
        <form className="form-horizontal">
            <div className="form-group">
                <input
                    className={this.presentQuestion()}
                    name="question"
                    type="text"
                    autoFocus="true"
                    onChange={this.props.updateFormField.bind(null, 'question')}
                    placeholder="Type your question here..."
                />
            </div>
            {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            {this.addPollExpiry()}
            {this.addVotesPerPerson()}
            {this.addDuplicateVotesAllowed()}
            {this.addFormSubmit()}
        </form>
    )
  }
}


