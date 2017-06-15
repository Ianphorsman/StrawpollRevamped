class PieChart extends React.Component {

    labels (pieSlice) {
        return this.props.pollData.options[pieSlice].label
    }

    yValues (pieSlice) {
        return this.props.pollData.options[pieSlice].yValue
    }

    colors (pieSlice) {
        return this.props.pollData.options[pieSlice].color
    }


    resetChart () {
        $('#chart-container canvas').remove();
        $('#chart-container').append("<canvas id='pie-chart'></canvas>");
    }

    plotLocation () {
        return $('#pie-chart').get(0).getContext('2d');
    }

    data () {
        return {
            labels: Object.keys(this.props.pollData.options).map(this.labels.bind(this)),
            datasets: [{
                data: Object.keys(this.props.pollData.options).map(this.yValues.bind(this)),
                backgroundColor: Object.keys(this.props.pollData.options).map(this.colors.bind(this))
            }]
        }
    }

    componentDidMount() {
        console.log(this.plotLocation())
    }


    render() {
        this.resetChart();
        let pieChart = new Chart(this.plotLocation(), {
            type: 'doughnut',
            data: this.data(),
            options: { animation: false }
        })
        return <div />
    }
}


