import React from 'react';
import TopLanguagesChart from './TopLanguagesChart';
import MostStarredReposChart from './MostStarredReposChart';
import './ChartsStyles.scss';

const Charts = () => {
    const chartSize = { height: 100, width: 100 };

    return (
        <div className="charts">
            <div className="charts__chart">
                <h2 className="charts__chart__heading">Top Languages</h2>
                <div className="charts__chart__container">
                    <TopLanguagesChart chartSize={chartSize} />
                </div>
            </div>
            <div className="charts__chart">
                <h2 className="charts__chart__heading">Most Starred Repos</h2>
                <div className="charts__chart__container">
                    <MostStarredReposChart chartSize={chartSize} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
