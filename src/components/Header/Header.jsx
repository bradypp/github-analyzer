import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { GitHubContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Error, RepoCorner } from 'components';
import './Header.scss';

const Header = () => {
    const { resetUserState, error, setError, resetError } = useContext(GitHubContext);
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
            resetUserState();
            goToUserPage(searchText);
            setSearchText('');
        } else {
            setError(404, 'Please enter a username or click random to continue...');
        }
    };

    return (
        <div className="header">
            <form onSubmit={onSubmit} className="header__form">
                <input
                    type="text"
                    name="username"
                    id="username"
                    className={`header__form__input ${
                        error.active && error.type === 404
                            ? 'header__form__input--error'
                            : error.active && error.type !== 404
                            ? 'header__form__input--hide'
                            : ''
                    }`}
                    placeholder="Enter Username..."
                    value={searchText}
                    onChange={onChange}
                />
                <button type="submit" className="header__form__submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <Error active={error.active} type={error.type} message={error.message} />
            </form>
            <RepoCorner />
        </div>
    );
};

export default Header;
