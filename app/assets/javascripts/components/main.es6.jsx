class Main extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            ...props,
        }
    }

    updateForm(event, label) {
        this.setState({
            [label]: event.target.value
        })
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

  render () {

    return(
        <div>
            <p>Hello World</p>
        </div>
    )
  }

}

