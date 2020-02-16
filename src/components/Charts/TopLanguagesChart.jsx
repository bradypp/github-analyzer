import React, { useEffect, useContext, useState } from 'react';
import { GitHubContext } from 'context';
import { buildChart } from 'utils';
import './ChartsStyles.scss';

const TopLanguagesChart = ({ chartSize: { height, width } }) => {
    const {
        stats: { languageData },
    } = useContext(GitHubContext);

    const [topLanguagesChartData, setTopLanguagesChartData] = useState(null);

    // Create most used languages chart
    const initTopLanguagesChart = () => {
        const ctx = document.getElementById('topLanguagesChart');
        const sortedLanguages = languageData.sort((a, b) => b.count - a.count);

        const maxLanguages = 8;
        const topLanguages = sortedLanguages.slice(0, maxLanguages);
        const otherLanguages = sortedLanguages.slice(maxLanguages, -1);
        const other = {
            language: 'Other',
            count: otherLanguages.reduce((acc, language) => acc + language.count, 0),
            stars: otherLanguages.reduce((acc, language) => acc + language.stars, 0),
            color: '#dbdbdb',
        };
        topLanguages.push(other);

        const labels = topLanguages.map(el => el.language);
        const data = topLanguages.map(el => el.count);

        setTopLanguagesChartData(data);

        if (data.length > 0) {
            const backgroundColor = topLanguages.map(({ color }) =>
                !color
                    ? '#ccc'
                    : `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`
            );
            const borderColor = topLanguages.map(({ color }) => (!color ? '#bbb' : `${color}`));
            const chartType = 'pie';
            const axes = false;
            const legend = true;
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
        initTopLanguagesChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageData]);

    return <canvas id="topLanguagesChart" height={height} width={width} />;
};

export default TopLanguagesChart;