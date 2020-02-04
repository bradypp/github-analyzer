/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { GithubContext } from 'context/github';
import './UserInfoStyles.scss';

const UserInfo = ({ match }) => {
    const githubContext = useContext(GithubContext);
    const { user, loading, getUser } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login]);

    return (
        <div className="user-info">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <img className="user-info__img" src={user.avatar_url} alt="User Avatar" />
                    <ul className="user-info__items">
                        <li>{user.name && user.name}</li>
                        <li>{user.company && user.company}</li>
                        <li>{user.location && user.location}</li>
                        {user.created_at && (
                            <li>
                                Joined{' '}
                                {new Date(user.created_at).toLocaleDateString('en-UK', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </li>
                        )}
                        <li>{user.bio && user.bio}</li>
                        <li>{user.bio && user.bio}</li>
                    </ul>
                </>
            )}
        </div>
    );
};

UserInfo.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

export default withRouter(UserInfo);
