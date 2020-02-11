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
    const { user, userLoading, repos, reposLoading, stats, setStats } = gitHubContext;

    const { public_repos, public_gists, followers, following } = user;
    const { stars } = stats;

    const getStats = () => {
        let stars = 0;

        // TODO: use the below loop to get all the data you need from the repos
        repos.forEach(repo => {
            stars += repo.stargazers_count;
        });

        setStats(stars);
    };

    useEffect(() => {
        if (userLoading || reposLoading) return;

        getStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login, userLoading, reposLoading]);

    return (
        <div className="stats">
            {userLoading || reposLoading ? (
                <Spinner />
            ) : (
                <>
                    <ul className="stats__user-stats">
                        {/* TODO: loop through a stat item for below */}
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
