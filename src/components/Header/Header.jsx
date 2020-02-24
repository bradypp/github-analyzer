import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { GitHubContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faRandom } from '@fortawesome/free-solid-svg-icons';
import { RepoCorner } from 'components';
import { useClickedOutsideHandler } from 'utils/hooks';
import './HeaderStyles.scss';

const Header = () => {
    const { resetUserState, error, setError, resetError, getRandomUser } = useContext(
        GitHubContext
    );
    const [searchText, setSearchText] = useState('');
    const [isExpandActive, setIsExpandActive] = useState(false);
    const history = useHistory();
    const wrapperRef = useRef(null);

    const onChange = event => {
        resetError();
        setSearchText(event.target.value);
    };

    const goToUserPage = username => {
        resetUserState();
        history.push(`/user/${username}`);
        setIsExpandActive(false);
    };

    const onRandom = async () => {
        const randomUser = await getRandomUser();
        goToUserPage(randomUser.login);
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

    const expandSearch = () => !isExpandActive && setIsExpandActive(!isExpandActive);

    useClickedOutsideHandler(wrapperRef, isExpandActive, setIsExpandActive, !isExpandActive);

    return (
        <div className="header">
            <Link to="/" className="header__btn header__home">
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <div onClick={onRandom}>
                <div className="header__btn header__random">
                    <FontAwesomeIcon icon={faRandom} />
                </div>
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
                </div>
            </form>
            <RepoCorner />
        </div>
    );
};

export default Header;
