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
    Octoface,
    Organization,
    Repo,
    Gist,
    Star,
} from '@primer/octicons-react';
import { GitHubContext } from 'context';
import { Spinner } from 'components';
import './UserInfoStyles.scss';

const UserInfo = ({ match }) => {
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
            public_repos,
            public_gists,
            followers,
            following,
        },
        stats: { totalStars },
        userLoading,
        getUser,
    } = useContext(GitHubContext);

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
                        <a href={html_url} target="_blank" rel="noopener noreferrer">
                            <img
                                className="user-info__top__img"
                                src={avatar_url}
                                alt="User Avatar"
                            />
                        </a>
                        <h1 className="user-info__top__name">{name}</h1>
                        <a
                            href={html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="user-info__top__login">
                            <Octicon icon={MarkGithub} size="small" />
                            {login}
                        </a>
                        {bio && <div className="user-info__top__bio">{bio}</div>}
                    </div>

                    <ul className="user-info__items">
                        {company && (
                            <li>
                                <Octicon icon={Briefcase} size="small" />
                                {company}
                            </li>
                        )}
                        {location && (
                            <li>
                                <Octicon icon={Location} size="small" />
                                {location}
                            </li>
                        )}
                        {email && (
                            <li>
                                <Octicon icon={Mail} size="small" />
                                {email}
                            </li>
                        )}
                        {blog && (
                            <li>
                                <Octicon icon={Link} size="small" />
                                <a href={blog} target="_blank" rel="noopener noreferrer">
                                    {blog}
                                </a>
                            </li>
                        )}
                        <li>
                            <Octicon icon={Calendar} size="small" />
                            Joined{' '}
                            {new Date(created_at).toLocaleDateString('en-UK', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </li>
                    </ul>

                    <ul className="user-info__stats">
                        <li>
                            <Octicon icon={Octoface} size="small" />
                            Followers: {followers}
                        </li>
                        <li>
                            <Octicon icon={Organization} size="small" />
                            Following: {following}
                        </li>
                        <li>
                            <Octicon icon={Repo} size="small" />
                            Total Repos: {public_repos}
                        </li>
                        <li>
                            <Octicon icon={Gist} size="small" />
                            Total Gists: {public_gists}
                        </li>
                        <li>
                            <Octicon icon={Star} size="small" />
                            Total Stars: {totalStars}
                        </li>
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
