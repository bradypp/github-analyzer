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
                //     fontColor: 'rgba(199,199,199,1)',
                // },
                ticks: {
                    fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
                    fontSize: 12,
                    fontColor: 'rgba(199,199,199,1)',
                },
                gridLines: {
                    zeroLineColor: 'rgba(199,199,199,0.5)',
                    color: 'rgba(199,199,199,0.5)',
                },
            },
        ],
        yAxes: [
            {
                // scaleLabel: {
                //     display: yAxis,
                //     labelString: yAxis,
                //     fontColor: 'rgba(199,199,199,1)',
                // },
                ticks: {
                    beginAtZero: true,
                    fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
                    fontSize: 12,
                    fontColor: 'rgba(199,199,199,1)',
                },
                gridLines: {
                    zeroLineColor: 'rgba(199,199,199,0.5)',
                    color: 'rgba(199,199,199,0.5)',
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
            fontColor: 'rgba(199,199,199,1)',
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
