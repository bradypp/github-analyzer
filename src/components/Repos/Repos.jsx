import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { GitHubContext } from 'context';
import FlipMove from 'react-flip-move';
import { RepoItem, Spinner } from 'components';
import './ReposStyles.scss';

const Repos = () => {
    const { repos, reposLoading, getRepos, error } = useContext(GitHubContext);
    const { username } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (error.active) {
            history.push(`/`);
        } else {
            getRepos(username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    return (
        <div className="repos">
            {reposLoading ? (
                <Spinner />
            ) : (
                <FlipMove>
                    <h1 className="repos__title">Top Repos</h1>
                    <ul className="repos__items">
                        {repos.map(repo => (
                            <RepoItem key={repo.id} repo={repo} />
                        ))}
                    </ul>
                </FlipMove>
            )}
        </div>
    );
};

export default Repos;
