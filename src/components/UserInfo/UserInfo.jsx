/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Octicon, {
    Briefcase,
    Calendar,
    Mail,
    Location,
    Link,
    MarkGithub,
} from '@primer/octicons-react';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import './UserInfoStyles.scss';

const UserInfo = ({ match }) => {
    const gitHubContext = useContext(GitHubContext);
    const {
        user: {
            avatar_url,
            html_url,
            name,
            login,
            bio,
            company,
            location,
            email,
            blog,
            created_at,
        },
        userLoading,
        getUser,
    } = gitHubContext;

    useEffect(() => {
        getUser(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.login]);

    return (
        <div className="user-info">
            {userLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="user-info__top">
                        {avatar_url && (
                            <a href={html_url} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="user-info__top__img"
                                    src={avatar_url}
                                    alt="User Avatar"
                                />
                            </a>
                        )}

                        {name && <h1 className="user-info__top__name">{name}</h1>}

                        {login && (
                            <a
                                href={html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="user-info__top__login">
                                <Octicon
                                    className="user-info__top__octicon"
                                    icon={MarkGithub}
                                    size="small"
                                />
                                {login}
                            </a>
                        )}
                        {bio && <div className="user-info__top__bio">{bio}</div>}
                    </div>

                    <div className="user-info__items">
                        {company && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Briefcase}
                                    size="small"
                                />
                                {company}
                            </div>
                        )}
                        {location && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Location}
                                    size="small"
                                />
                                {location}
                            </div>
                        )}
                        {email && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Mail}
                                    size="small"
                                />
                                {email}
                            </div>
                        )}
                        {blog && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Link}
                                    size="small"
                                />
                                <a href={blog} target="_blank" rel="noopener noreferrer">
                                    {blog}
                                </a>
                            </div>
                        )}
                        {created_at && (
                            <div className="user-info__items__item">
                                <Octicon
                                    className="user-info__items__octicon"
                                    icon={Calendar}
                                    size="small"
                                />
                                Joined{' '}
                                {new Date(created_at).toLocaleDateString('en-UK', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </div>
                        )}
                    </div>
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
