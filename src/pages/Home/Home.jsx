import React, { useState, useEffect, useContext } from 'react';
import { GitHubContext } from 'context';

import Octicon, { MarkGithub } from '@primer/octicons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './HomeStyles.scss';

const Home = ({ history }) => {
    const { resetState } = useContext(GitHubContext);
    const [searchText, setSearchText] = useState('');

    const onChange = event => setSearchText(event.target.value);

    const onSubmit = event => {
        event.preventDefault();
        if (searchText === '') {
            alert('Please enter a GitHub username');
        } else {
            history.push(`/user/${searchText}`);
            setSearchText('');
        }
    };

    useEffect(() => {
        resetState();
    }, [resetState]);

    return (
        // Search for a user
        <div className="home">
            <form onSubmit={onSubmit} className="home__form">
                <Octicon icon={MarkGithub} size="large" className="home__form__github-icon" />
                <label htmlFor="username" className="home__form__label">
                    Find a GitHub Profile
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="home__form__input"
                        placeholder="Enter Username..."
                        value={searchText}
                        onChange={onChange}
                    />
                </label>
                <button type="submit" className="home__form__submit">
                    <FontAwesomeIcon icon={faSearch} size="6x" />
                </button>
            </form>
        </div>
    );
};

export default Home;
