import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GitHubContext } from 'context';
import FlipMove from 'react-flip-move';
import { RepoItem, Spinner } from 'components';
import './ReposStyles.scss';

const Repos = ({ match }) => {
    const gitHubContext = useContext(GitHubContext);
    const { repos, loading, getRepos } = gitHubContext;

    useEffect(() => {
        getRepos(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login]);

    return (
        <div className="repos">
            {loading ? (
                <Spinner />
            ) : (
                <FlipMove>
                    <h1 className="repos__title">Top Repos</h1>
                    <ul className="repos__items">
                        {repos.map(repo => (
                            <RepoItem key={repo.id} repo={repo} />
                        ))}
                    </ul>
                </FlipMove>
            )}
        </div>
    );
};

Repos.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

export default withRouter(Repos);
