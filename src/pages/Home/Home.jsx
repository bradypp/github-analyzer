import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { GitHubContext } from 'context';
import Octicon, { MarkGithub } from '@primer/octicons-react';
import { Error } from 'components';
import './HomeStyles.scss';

const Home = () => {
    const { resetUserState, getRandomUser, error, setError, resetError } = useContext(
        GitHubContext
    );
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    const onChange = event => {
        resetError();
        setSearchText(event.target.value);
    };

    const goToUserPage = username => {
        history.push(`/user/${username}`);
    };

    const onSubmit = event => {
        event.preventDefault();
        if (searchText !== '') {
            goToUserPage(searchText);
            setSearchText('');
        } else {
            setError(404, 'Please enter a username or click random to continue...');
        }
    };

    const onRandom = async () => {
        const randomUser = await getRandomUser();
        goToUserPage(randomUser.login);
    };

    useEffect(() => {
        resetUserState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <div
                    className={`home__form__button-container ${
                        error.active && error.type !== 404
                            ? 'home__form__button-container--hide'
                            : ''
                    }`}>
                    <button type="submit" className="home__form__submit">
                        Search
                    </button>
                    <span className="home__form__text">or</span>
                    <button type="button" className="home__form__submit" onClick={onRandom}>
                        Random!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Home;
