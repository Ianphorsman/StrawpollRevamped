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
        $('#pie-chart-container canvas').remove();
        $('#chart-legend').remove();
        $('#pie-chart-container').append("<canvas id='pie-chart'></canvas>");
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


    render() {
        this.resetChart();
        let pieChart = new Chart(this.plotLocation(), {
            type: 'doughnut',
            data: this.data(),
            options: {
                animation: false,
                legend: false,
                legendCallback: function(chart) {
                    let text = []
                    text.push("<ul id='chart-legend' class='" + chart.id + "-legend list-group col-3 my-auto'>")
                    for (let i=0; i < chart.data.datasets[0].data.length; i++) {
                        text.push("<li class='list-group-item legend-label'><span style='background-color:" + chart.data.datasets[0].backgroundColor[i] + "'>")
                        if (chart.data.labels[i]) {
                            text.push(chart.data.labels[i])
                        }
                        text.push("</span></li>")
                    }
                    text.push("</ul>")
                    return text.join('')
                }
            }
        })
        $('#chart-container').append(pieChart.generateLegend())
        return <div />
    }
}


