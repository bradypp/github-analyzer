/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Octicon, {
    Repo,
    Star,
    RepoForked,
    Calendar,
    Sync,
    Eye,
    Browser,
    IssueOpened,
} from '@primer/octicons-react';
import './ReposItemStyles.scss';

const RepoItem = ({ repo }) => {
    const {
        name,
        description,
        html_url,
        created_at,
        updated_at,
        size,
        forks_count,
        stargazers_count,
        watchers_count,
        language,
        open_issues_count,
    } = repo;

    const calculateSize = () => {
        if (size > 1000) {
            return `${size / 1000} MB`;
        }
        return `${size} KB`;
    };

    return (
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="repo-github-url">
            <li className="repo-item">
                <div className="repo-item__name">
                    <Octicon className="repo-item__name__octicon" icon={Repo} />
                    <h3>{name}</h3>
                </div>
                {description && <p className="repo-item__description">{description}</p>}
                <div className="repo-item__attributes repo-item__attributes--1">
                    <div className="repo-item__attributes__created_at">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={Calendar}
                            size="small"
                        />
                        {new Date(created_at).toLocaleDateString('en-UK', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                    <div className="repo-item__attributes__updated_at">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={Sync}
                            size="small"
                        />
                        {new Date(updated_at).toLocaleDateString('en-UK', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                </div>
                <div className="repo-item__attributes repo-item__attributes--2">
                    <div className="repo-item__attributes__language">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={Browser}
                            size="small"
                        />
                        {language}
                    </div>
                    <div className="repo-item__attributes__stars">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={Star}
                            size="small"
                        />
                        {stargazers_count}
                    </div>
                    <div className="repo-item__attributes__forks">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={RepoForked}
                            size="small"
                        />
                        {forks_count}
                    </div>
                    <div className="repo-item__attributes__issues">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={IssueOpened}
                            size="small"
                        />
                        {open_issues_count}
                    </div>
                    <div className="repo-item__attributes__watching">
                        <Octicon
                            className="repo-item__attributes__octicon"
                            icon={Eye}
                            size="small"
                        />
                        {watchers_count}
                    </div>
                    <div className="repo-item__attributes__size">{calculateSize()} </div>
                </div>
            </li>
        </a>
    );
};

RepoItem.propTypes = {
    repo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        html_url: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        language: PropTypes.string,
        size: PropTypes.number.isRequired,
        forks_count: PropTypes.number.isRequired,
        stargazers_count: PropTypes.number.isRequired,
        watchers_count: PropTypes.number.isRequired,
        open_issues_count: PropTypes.number.isRequired,
    }).isRequired,
};

export default RepoItem;
