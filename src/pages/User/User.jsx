import React, { useContext } from 'react';

import { GithubContext } from 'context/github';

import './User.scss';

const User = () => {
    const githubContext = useContext(GithubContext);
    const { user, loading } = githubContext;
    return (
        <div className="container">
            <div className="user-info">
                <h1>User Info</h1>
            </div>
        </div>
    );
};

export default User;
