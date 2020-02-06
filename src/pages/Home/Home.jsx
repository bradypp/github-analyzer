import React, { useState } from 'react';
import './HomeStyles.scss';

const Home = ({ history }) => {
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

    return (
        // Search for a user
        <div className="container">
            <form onSubmit={onSubmit} className="search-form">
                <input
                    type="text"
                    name="text"
                    className="search-form__text-input"
                    placeholder="Search Users..."
                    value={searchText}
                    onChange={onChange}
                />
                <input type="submit" value="Search" className="search-form__submit-button" />
            </form>
        </div>
    );
};

export default Home;
