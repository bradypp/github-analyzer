/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import Octicon, {
    Octoface,
    Organization,
    Repo,
    Gist,
    Star,
    Megaphone,
} from '@primer/octicons-react';
import TopLanguagesChart from './Charts/TopLanguagesChart';
import MostStarredReposChart from './Charts/MostStarredReposChart';
import StarsPerLanguageChart from './Charts/StarsPerLanguageChart';
import './StatsStyles.scss';

const Stats = () => {
    const {
        user: { public_repos, public_gists, followers, following, hireable },
        stats: { totalStars },
        userLoading,
        reposLoading,
        statsLoading,
        setStats,
    } = useContext(GitHubContext);
    const { username } = useParams();

    useEffect(() => {
        setStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, userLoading, reposLoading]);

    const chartSize = { height: 100, width: 100 };

    return (
        <>
            {statsLoading || userLoading || reposLoading ? (
                <div className="stats-spinner">
                    <Spinner />
                </div>
            ) : (
                <div className="stats">
                    <div className="stats__user">
                        <div className="stats__user__item">
                            <Octicon icon={Octoface} size="medium" />
                            Followers: {followers}
                        </div>
                        <div className="stats__user__item">
                            <Octicon icon={Organization} size="medium" />
                            Following: {following}
                        </div>
                        <div className="stats__user__item">
                            <Octicon icon={Repo} size="medium" />
                            Total Repos: {public_repos}
                        </div>
                        <div className="stats__user__item">
                            <Octicon icon={Gist} size="medium" />
                            Total Gists: {public_gists}
                        </div>
                        <div className="stats__user__item">
                            <Octicon icon={Star} size="medium" />
                            Stars: {totalStars}
                        </div>
                        <div className="stats__user__item">
                            <Octicon icon={Megaphone} size="medium" />
                            Available: {hireable ? 'Yes' : 'No'}
                        </div>
                    </div>
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
                </div>
            )}
        </>
    );
};

export default Stats;
