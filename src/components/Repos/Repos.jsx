import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import uuidv4 from 'uuid/v4';
import Octicon, { TriangleDown } from '@primer/octicons-react';
import { GitHubContext } from 'context';
import FlipMove from 'react-flip-move';
import { RepoItem, Spinner } from 'components';
import { useClickedOutsideHandler } from 'utils/hooks';

import './ReposStyles.scss';

const Repos = () => {
    const [sortType, setSortType] = useState('stars');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { sortedRepos, reposLoading, getRepos, setSortedRepos, error } = useContext(
        GitHubContext
    );
    const { username } = useParams();
    const history = useHistory();
    const wrapperRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const changeRepoSort = sortType => {
        setSortType(sortType);
        toggleDropdown();
    };

    const sortTypes = ['stars', 'forks', 'size'];

    useClickedOutsideHandler(wrapperRef, dropdownOpen, setDropdownOpen, !dropdownOpen);

    useEffect(() => {
        if (error.active) {
            history.push(`/`);
        } else {
            getRepos(username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    useEffect(() => {
        setSortedRepos(sortType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reposLoading, sortType]);

    return (
        <div className="repos">
            {reposLoading ? (
                <Spinner />
            ) : (
                <>
                    <header>
                        <h2 className="repos__title">Top Repos</h2>
                        <div className="repos__dropdown-wrapper" ref={wrapperRef}>
                            <span className="repos__dropdown-wrapper__label">sorted by</span>
                            <div className="repos__dropdown">
                                <button
                                    className={`repos__dropdown__button ${
                                        dropdownOpen ? 'repos__dropdown__button--open' : ''
                                    }`}
                                    type="button"
                                    onClick={() => toggleDropdown()}>
                                    <p>{sortType}</p>
                                    <Octicon icon={TriangleDown} />
                                </button>
                                <ul
                                    className={`repos__dropdown__list ${
                                        dropdownOpen ? 'repos__dropdown__list--open' : ''
                                    }`}>
                                    {sortTypes.map(type => (
                                        <li className="repos__dropdown__list__item">
                                            <button
                                                type="button"
                                                key={uuidv4()}
                                                onClick={() => changeRepoSort(type)}>
                                                {type}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </header>
                    <>
                        {sortedRepos.length > 0 ? (
                            <FlipMove className="repos__items" typeName="ul">
                                {sortedRepos.map(repo => (
                                    <RepoItem key={repo.id} repo={repo} />
                                ))}
                            </FlipMove>
                        ) : (
                            <p>No available repositories!</p>
                        )}
                    </>
                </>
            )}
        </div>
    );
};

export default Repos;
