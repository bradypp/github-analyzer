import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import TopLanguagesChart from './TopLanguagesChart';
import MostStarredReposChart from './MostStarredReposChart';
import './ChartsStyles.scss';

const Charts = ({ match }) => {
    const gitHubContext = useContext(GitHubContext);
    const { userLoading, reposLoading, statsLoading, setStats } = gitHubContext;

    useEffect(() => {
        setStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login, userLoading, reposLoading]);

    const chartSize = { height: 100, width: 100 };

    return (
        <div className="charts">
            {statsLoading || userLoading || reposLoading ? (
                <Spinner />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

Charts.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

export default withRouter(Charts);
