/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Octicon from '@primer/octicons-react';
import { GitHubContext } from 'context';
import { Spinner, Charts } from 'components';
import './StatsStyles.scss';

const Stats = ({ match }) => {
    const gitHubContext = useContext(GitHubContext);
    const { user, userLoading, reposLoading, statsLoading, stats, setStats } = gitHubContext;

    const { public_repos, public_gists, followers, following } = user;
    const { totalStars } = stats;

    // TODO: Wrap the following into a promise so that all data is loaded before re-rendering?

    useEffect(() => {
        setStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login, userLoading, reposLoading]);

    return (
        <div className="stats">
            {statsLoading || userLoading || reposLoading ? (
                <Spinner />
            ) : (
                <>
                    <ul className="stats__user-stats">
                        {/* TODO: Styling for the below list */}
                        <li>Followers: {followers}</li>
                        <li>Following: {following}</li>
                        <li>Repos: {public_repos}</li>
                        <li>Gists: {public_gists}</li>
                        <li>Stars: {totalStars}</li>
                    </ul>
                    <div className="stats__charts">
                        <Charts />
                    </div>
                </>
            )}
        </div>
    );
};

Stats.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

export default withRouter(Stats);
