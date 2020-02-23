import React, { useEffect, useContext } from 'react';
import { GitHubContext } from 'context';
import { buildChart, backgroundColor, borderColor } from 'utils';

const BiggestReposChart = ({ chartSize: { height, width } }) => {
    const {
        stats: { biggestRepos },
    } = useContext(GitHubContext);

    const initBiggestReposChart = () => {
        const ctx = document.getElementById('biggestReposChart');

        biggestRepos.reverse();
        const labels = biggestRepos.map(el => el.name);
        const data = biggestRepos.map(el => el.size);

        if (data.length > 0) {
            const chartType = 'horizontalBar';
            const axes = true;
            const legend = false;
            const label = {
                xAxis: 'KB',
            };
            const config = {
                ctx,
                chartType,
                labels,
                data,
                backgroundColor,
                borderColor,
                axes,
                legend,
                label,
            };
            console.log(label);
            buildChart(config);
        }
    };

    useEffect(() => {
        initBiggestReposChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [biggestRepos]);

    return <canvas id="biggestReposChart" height={height} width={width} />;
};

export default BiggestReposChart;
