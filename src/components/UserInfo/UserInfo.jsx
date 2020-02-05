/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Octicon, { Briefcase, Calendar, Mail, Location, Link } from '@primer/octicons-react';

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
                    {user.avatar_url && (
                        <img className="user-info__img" src={user.avatar_url} alt="User Avatar" />
                    )}

                    {user.name && <h1 className="user-info__item-name">{user.name}</h1>}

                    {user.login && (
                        <span className="user-info__item-login">
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                @{user.login}
                            </a>
                        </span>
                    )}

                    {user.bio && <span className="user-info__item-bio">{user.bio}</span>}
                    {user.company && (
                        <div className="user-info__item">
                            <Octicon
                                className="user-info__item__octicon"
                                icon={Briefcase}
                                size="small"
                            />
                            {user.company}
                        </div>
                    )}

                    {user.location && (
                        <div className="user-info__item">
                            <Octicon
                                className="user-info__item__octicon"
                                icon={Location}
                                size="small"
                            />
                            {user.location}
                        </div>
                    )}
                    {user.email && (
                        <div className="user-info__item">
                            <Octicon
                                className="user-info__item__octicon"
                                icon={Mail}
                                size="small"
                            />
                            {user.email}
                        </div>
                    )}
                    {user.blog && (
                        <div className="user-info__item">
                            <Octicon
                                className="user-info__item__octicon"
                                icon={Link}
                                size="small"
                            />
                            {user.blog}
                        </div>
                    )}
                    {user.created_at && (
                        <div className="user-info__item">
                            <Octicon
                                className="user-info__item__octicon"
                                icon={Calendar}
                                size="small"
                            />
                            Joined{' '}
                            {new Date(user.created_at).toLocaleDateString('en-UK', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                    )}
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
