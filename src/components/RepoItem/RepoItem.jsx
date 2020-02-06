/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Octicon, { Repo, Star, RepoForked, Calendar } from '@primer/octicons-react';
import './ReposItemStyles.scss';

const RepoItem = ({ repo }) => {
    const {
        name,
        description,
        html_url,
        created_at,
        size,
        forks_count,
        stargazers_count,
        watchers_count,
    } = repo;
    return (
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="repo-github-url">
            <li className="repo-item">
                <div className="repo-item__name">
                    <Octicon className="repo-item__octicon" icon={Repo} />
                    <h3>{name}</h3>
                </div>
                {description && <p className="repo-item__description">{description}</p>}
                <div className="repo-item__attributes">
                    {/* TODO: language
                    <div className="repo-item__attributes__language">{description}</div> */}
                    <div className="repo-item__attributes__stars">{stargazers_count}</div>
                    <div className="repo-item__attributes__forks">{forks_count}</div>
                    <div className="repo-item__attributes__watching">{watchers_count}</div>
                    <div className="repo-item__attributes__size">{size} KB</div>
                    <div className="repo-item__attributes__created-at">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={Calendar}
                            size="small"
                        />
                        Created at{' '}
                        {new Date(created_at).toLocaleDateString('en-UK', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                </div>
            </li>
        </a>
    );
};

RepoItem.propTypes = {
    repo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        forks_count: PropTypes.string.isRequired,
        stargazers_count: PropTypes.string.isRequired,
        watchers_count: PropTypes.string.isRequired,
    }).isRequired,
};

export default RepoItem;
