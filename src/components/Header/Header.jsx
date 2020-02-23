<<<<<<< HEAD
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { GitHubContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { Error, RepoCorner } from 'components';
import './HeaderStyles.scss';
=======
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { GitHubContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Error, RepoCorner } from 'components';
import './Header.scss';
>>>>>>> df52c30ef1bdf2467b612bb9baea491e8b819d0c

const Header = () => {
    const { resetUserState, error, setError, resetError } = useContext(GitHubContext);
    const [searchText, setSearchText] = useState('');
<<<<<<< HEAD
    const [isExpandActive, setIsExpandActive] = useState('');
    const history = useHistory();
    const wrapperRef = useRef(null);
=======
    const history = useHistory();
>>>>>>> df52c30ef1bdf2467b612bb9baea491e8b819d0c

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

<<<<<<< HEAD
    const expandSearch = () => !isExpandActive && setIsExpandActive(!isExpandActive);

    // Hook that alerts clicks outside of the passed ref
    const useClickedOutsideHandler = ref => {
        // Alert if clicked outside of element
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target) && isExpandActive) {
                setIsExpandActive(!isExpandActive);
            }
        };

        useEffect(() => {
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        });
    };
    useClickedOutsideHandler(wrapperRef);

    return (
        <div className="header">
            <div className="header__btn header__home" onClick={() => history.push('/')}>
                <FontAwesomeIcon icon={faHome} />
            </div>
            <form onSubmit={onSubmit} className="header__form">
                <div ref={wrapperRef} onClick={expandSearch}>
                    <label
                        htmlFor="username"
                        className={`header__btn header__form__search-expand ${
                            isExpandActive ? 'header__form__search-expand--active' : ''
                        }`}>
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={`header__form__search-expand__input ${
                                isExpandActive ? 'header__form__search-expand__input--active' : ''
                            } ${
                                error.active && error.type === 404
                                    ? 'header__form__search-expand__input--error'
                                    : ''
                            }`}
                            placeholder="Enter Username..."
                            value={searchText}
                            onChange={onChange}
                        />
                    </label>
                    <Error active={error.active} type={error.type} message={error.message} />
                </div>
=======
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
>>>>>>> df52c30ef1bdf2467b612bb9baea491e8b819d0c
            </form>
            <RepoCorner />
        </div>
    );
};

export default Header;
