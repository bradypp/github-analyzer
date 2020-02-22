import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { GitHubContext } from 'context';
import Octicon, { MarkGithub } from '@primer/octicons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Error } from 'components';
import './HomeStyles.scss';

const Home = () => {
    const { error, setError, resetError } = useContext(GitHubContext);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    const onChange = event => {
        resetError();
        setSearchText(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();

        if (searchText !== '') {
            history.push(`/user/${searchText}`);
            setSearchText('');
        } else {
            setError(404, 'Please enter a username...');
        }
    };

    return (
        <div className="home">
            <form onSubmit={onSubmit} className="home__form">
                <Octicon icon={MarkGithub} size="large" className="home__form__github-icon" />
                <label htmlFor="username" className="home__form__label">
                    Find a GitHub Profile
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className={`home__form__input ${
                            error.active && error.type === 404
                                ? 'home__form__input--error'
                                : error.active && error.type !== 404
                                ? 'home__form__input--hide'
                                : ''
                        }`}
                        placeholder="Enter Username..."
                        value={searchText}
                        onChange={onChange}
                    />
                </label>
                <Error active={error.active} type={error.type} message={error.message} />
                <button type="submit" className="home__form__submit">
                    <FontAwesomeIcon icon={faSearch} size="6x" />
                </button>
            </form>
        </div>
    );
};

export default Home;
