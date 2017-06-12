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
            return "col filled option question"
        } else {
            return "col option"
        }
    }


    presentPollExpiresIn() {
        if (this.validPollExpiresIn()) {
            return "col filled poll-option"
        } else {
            return "col poll-option"
        }
    }

    presentNumVotesAllowed() {
        if (this.validNumVotesAllowed()) {
            return "col filled poll-option"
        } else {
            return "col poll-option"
        }
    }

    presentDuplicateVotesAllowed(value) {
        if (this.props.duplicateVotesAllowed == value) {
            return "col clicked"
        } else {
            return "col"
        }
    }


    presentOption(option) {
        const validOption = this.validOption(option)
        const filledOption = this.filledOption(option)
        if (validOption && filledOption) {
            return "col option filled"
        } else if (!(validOption) && filledOption) {
            return "col option error"
        } else {
            return "col option"
        }
    }

    createPollEnabled() {
        if (this.validQuestion() && this.validOptions()) {
            return "col btn create-poll"
        } else {
            return "col btn create-poll disabled"
        }
    }

    /* Field Helpers */

    addSelectionFields(option) {
        return (
            <div className="row">
                <input
                    type="text"
                    name={"option_" + option}
                    onChange={this.props.updateSelectionField.bind(null, option[0])}
                    onFocus={this.props.increaseOptionCount.bind(null)}
                    className={this.presentOption(option)}
                    placeholder="Answer"
                    tabIndex={parseInt(option)+2}
                />
            </div>
        )
    }

    addPollExpiry() {
        return (
            <div className="row select">
                <label className="col-6">Close poll in </label>
                <input
                    className={this.presentPollExpiresIn()}
                    onChange={this.props.updateFormField.bind(null, 'pollExpiresIn')}
                    type="text"
                    name="poll-expires-in"
                    placeholder="7"
                    tabIndex={Object.keys(this.props.options).length+3}
                />
                <select
                    onChange={this.props.updateFormField.bind(null, 'pollExpiryUnit')}
                    className="col"
                    name="poll-expiry-unit"
                    tabIndex={Object.keys(this.props.options).length+4}>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="never">never</option>
                    <i className="fa fa-angle-down"></i>
                </select>
            </div>
        )
    }

    addVotesPerPerson() {
        return (
            <div className="row adv-option">
                <label className="col-6">Votes allowed per person: </label>
                <input
                    className={this.presentNumVotesAllowed()}
                    onChange={this.props.updateFormField.bind(null, 'numVotes')}
                    type="text"
                    name="num-votes"
                    placeholder="1"
                    tabIndex={Object.keys(this.props.options).length+5}
                />
                <div className="col"></div>
            </div>
        )
    }

    addDuplicateVotesAllowed() {
        return (
            <div className="row">
                <label className="col-6">Duplicate Votes Allowed: </label>
                <button
                    className={this.presentDuplicateVotesAllowed(true)}
                    type="button"
                    onClick={this.props.updateDuplicateVotesAllowed.bind(null, true)}
                    tabIndex={Object.keys(this.props.options).length+6}>Yes</button>
                <button
                    className={this.presentDuplicateVotesAllowed(false)}
                    id="second-choice"
                    type="button"
                    onClick={this.props.updateDuplicateVotesAllowed.bind(null, false)}
                    tabIndex={Object.keys(this.props.options).length+7}>No</button>
            </div>
        )
    }

    addFormSubmit() {
        return (
            <div className="row">
                    <button
                        type="button"
                        className={this.createPollEnabled()}
                        onClick={this.props.createPoll.bind(null)}
                        tabIndex={Object.keys(this.props.options).length+8}>
                        Create
                    </button>
            </div>
        )
    }



  render () {
    return(
        <section id="new-poll-form" className="container">
            <div className="row">
                <input
                    className={this.presentQuestion()}
                    name="question"
                    type="text"
                    autoFocus="true"
                    onChange={this.props.updateFormField.bind(null, 'question')}
                    placeholder="Type your question here..."
                    tabIndex="1"
                />
            </div>
            {Object.keys(this.props.options).map(this.addSelectionFields.bind(this))}
            <div className="row separator"></div>
            {this.addPollExpiry()}
            {this.addVotesPerPerson()}
            {this.addDuplicateVotesAllowed()}
            {this.addFormSubmit()}
        </section>
    )
  }
}


