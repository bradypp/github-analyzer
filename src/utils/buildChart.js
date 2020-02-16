import Chart from 'chart.js';

const buildScales = axes => {
    const scales = {
        xAxes: [
            {
                ticks: {
                    fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
                    fontSize: 12,
                },
            },
        ],
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
                    fontSize: 12,
                },
            },
        ],
    };

    return axes ? scales : null;
};

const buildLegend = legend => {
    const leg = {
        position: 'bottom',
        labels: {
            fontFamily: "'Lato', system, -apple-system, 'Arial', sans-serif",
        },
    };
    return legend ? leg : null;
};

const buildChart = config => {
    const { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend } = config;

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
            scales: buildScales(axes),
            legend: buildLegend(legend),
            tooltips: {
                cornerRadius: 3,
            },
        },
    });
};

export default buildChart;
