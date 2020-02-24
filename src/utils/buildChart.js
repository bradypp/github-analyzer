import Chart from 'chart.js';

const buildScales = (axes, label = {}) => {
    // const { xAxis, yAxis } = label;
    const scales = {
        color: 'fff',
        xAxes: [
            {
                // scaleLabel: {
                //     display: xAxis,
                //     labelString: xAxis,
                //     fontColor: '#ccd6f6',
                // },
                ticks: {
                    fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
                    fontSize: 12,
                    fontColor: '#ccd6f6',
                },
                gridLines: {
                    zeroLineColor: '#8892b0',
                    color: '#8892b0',
                },
            },
        ],
        yAxes: [
            {
                // scaleLabel: {
                //     display: yAxis,
                //     labelString: yAxis,
                //     fontColor: '#ccd6f6',
                // },
                ticks: {
                    beginAtZero: true,
                    fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
                    fontSize: 12,
                    fontColor: '#ccd6f6',
                },
                gridLines: {
                    zeroLineColor: '#8892b0',
                    color: '#8892b0',
                },
            },
        ],
    };

    return axes ? scales : null;
};

const buildLegend = legend => {
    const leg = {
        position: 'right',
        labels: {
            fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
            fontColor: '#ccd6f6',
        },
    };
    return legend ? leg : null;
};

const buildChart = config => {
    const {
        ctx,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
        label,
    } = config;

    return new Chart(ctx, {
        type: chartType,
        responsive: true,
        maintainAspectRatio: true,
        data: {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor,
                    borderColor,
                    borderWidth: 2,
                },
            ],
        },
        options: {
            scales: buildScales(axes, label),
            legend: buildLegend(legend),
            tooltips: {
                cornerRadius: 5,
            },
        },
    });
};

export default buildChart;
