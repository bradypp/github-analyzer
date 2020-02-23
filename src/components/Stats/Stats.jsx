/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import TopLanguagesChart from './Charts/TopLanguagesChart';
import MostStarredReposChart from './Charts/MostStarredReposChart';
import StarsPerLanguageChart from './Charts/StarsPerLanguageChart';
import BiggestReposChart from './Charts/BiggestReposChart';
import './StatsStyles.scss';

const Stats = () => {
    const { userLoading, reposLoading, statsLoading, setStats } = useContext(GitHubContext);
    const { username } = useParams();

    useEffect(() => {
        setStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, userLoading, reposLoading]);

    const chartSize = { height: 100, width: 150 };

    return (
        <>
            {statsLoading || userLoading || reposLoading ? (
                <div className="stats-spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="stats">
                    <div className="stats__chart">
                        <h2 className="stats__chart__heading">Most Starred Repos</h2>
                        <div className="stats__chart__container">
                            <MostStarredReposChart chartSize={chartSize} />
                        </div>
                    </div>
                    <div className="stats__chart">
                        <h2 className="stats__chart__heading">Top Languages</h2>
                        <div className="stats__chart__container">
                            <TopLanguagesChart chartSize={chartSize} />
                        </div>
                    </div>
                    <div className="stats__chart">
                        <h2 className="stats__chart__heading">Stars Per Language</h2>
                        <div className="stats__chart__container">
                            <StarsPerLanguageChart chartSize={chartSize} />
                        </div>
                    </div>
                    <div className="stats__chart">
                        <h2 className="stats__chart__heading">Biggest Repos</h2>
                        <div className="stats__chart__container">
                            <BiggestReposChart chartSize={chartSize} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Stats;
