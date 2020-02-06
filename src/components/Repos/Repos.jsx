import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReposContext } from 'context';
import { Spinner, RepoItem } from 'components';
import './ReposStyles.scss';

const Repos = ({ match }) => {
    const reposContext = useContext(ReposContext);
    const { repos, loading, getRepos } = reposContext;

    useEffect(() => {
        getRepos(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login]);

    return (
        <div className="repos">
            {loading ? (
                <Spinner />
            ) : (
                repos.map(repo => {
                    return <div>{repo.name}</div>;
                })
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
