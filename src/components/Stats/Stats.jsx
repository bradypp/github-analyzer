/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Octicon from '@primer/octicons-react';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import './StatsStyles.scss';

const Stats = ({ match }) => {
    const gitHubContext = useContext(GitHubContext);
    const { user, userLoading, reposLoading, statsLoading, stats, getStats } = gitHubContext;

    const { public_repos, public_gists, followers, following } = user;
    const { stars } = stats;

    useEffect(() => {
        // if (userLoading || reposLoading) return;
        getStats(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login, userLoading, reposLoading]);

    return (
        <div className="stats">
            {statsLoading ? (
                <Spinner />
            ) : (
                <>
                    <ul className="stats__user-stats">
                        <li>Followers: {followers}</li>
                        <li>Following: {following}</li>
                        <li>Repos: {public_repos}</li>
                        <li>Gists: {public_gists}</li>
                        <li>Stars: {stars}</li>
                    </ul>
                    <div className="stats__charts"></div>
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
