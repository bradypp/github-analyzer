import React, { useContext } from 'react';

import { GithubContext } from 'context/github';

import './User.scss';

const User = () => {
    const githubContext = useContext(GithubContext);
    const { user, loading } = githubContext;
    return (
        <div className="user-page">
            <div className="user-info">Users</div>
        </div>
    );
};

export default User;
