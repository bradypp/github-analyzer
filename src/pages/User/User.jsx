import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { GithubContext } from 'context/github';

import './User.scss';

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);
    const { user, loading, getUser } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
    }, [getUser, match.params.login]);

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    return (
        <div className="container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="user-info">
                    <h1>User Info</h1>
                    <p>{name}</p>
                </div>
            )}
        </div>
    );
};

User.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

export default User;
