import React, { useEffect, useContext, useState } from 'react';
import { GitHubContext } from 'context';
import { buildChart, backgroundColor, borderColor } from 'utils';
import './ChartsStyles.scss';

const MostStarredReposChart = ({ chartSize: { height, width } }) => {
    const {
        stats: { topRepos },
    } = useContext(GitHubContext);

    const [mostStarredReposChartData, setMostStarredReposChartData] = useState(null);

    // Create most starred repos chart
    const initMostStarredReposChart = () => {
        const ctx = document.getElementById('mostStarredReposChart');

        const labels = topRepos.map(el => el.name);
        const data = topRepos.map(el => el.stargazers_count);

        setMostStarredReposChartData(data);

        if (data.length > 0) {
            const chartType = 'bar';
            const axes = true;
            const legend = false;
            const config = {
                ctx,
                chartType,
                labels,
                data,
                backgroundColor,
                borderColor,
                axes,
                legend,
            };
            buildChart(config);
        }
    };

    useEffect(() => {
        initMostStarredReposChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topRepos]);

    return <canvas id="mostStarredReposChart" height={height} width={width} />;
};

export default MostStarredReposChart;
