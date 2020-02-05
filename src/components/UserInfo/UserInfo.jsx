/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Octicon, { Briefcase, Calendar, Mail, Location, Link } from '@primer/octicons-react';
import PropTypes from 'prop-types';
import { UserInfoContext } from 'context';
import './UserInfoStyles.scss';

const UserInfo = ({ match }) => {
    const userInfoContext = useContext(UserInfoContext);
    const { user, loading, getUser } = userInfoContext;

    useEffect(() => {
        getUser(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="user-info">
                    <div className="user-info__top">
                        {user.avatar_url && (
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="user-info__top__img"
                                    src={user.avatar_url}
                                    alt="User Avatar"
                                />
                            </a>
                        )}

                        {user.name && <h1 className="user-info__top__name">{user.name}</h1>}

                        {user.login && (
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="user-info__top__login">
                                @{user.login}
                            </a>
                        )}
                        {user.bio && <div className="user-info__top__bio">{user.bio}</div>}
                    </div>

                    <div className="user-info__items">
                        {user.company && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Briefcase}
                                    size="small"
                                />
                                {user.company}
                            </div>
                        )}
                        {user.location && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Location}
                                    size="small"
                                />
                                {user.location}
                            </div>
                        )}
                        {user.email && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Mail}
                                    size="small"
                                />
                                {user.email}
                            </div>
                        )}
                        {user.blog && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Link}
                                    size="small"
                                />
                                <a href={user.blog} target="_blank" rel="noopener noreferrer">
                                    {user.blog}
                                </a>
                            </div>
                        )}
                        {user.created_at && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
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
                    </div>
                </div>
            )}
        </>
    );
};

UserInfo.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

export default withRouter(UserInfo);
