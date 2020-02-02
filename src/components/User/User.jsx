import React from 'react';
import axios from 'axios';

import './User.module.scss';

const User = () => {
    const getUserData = async () => {
        const username = 'bchiang7';
        const res = await axios.get(`https://api.github.com/search/users/${username}`);
        console.log(res);
    };

    return (
        <div className="user-info">
            <h1 className="title">User Info</h1>
            <button type="submit" onClick={getUserData} className="submit-button">
                Submit
            </button>
        </div>
    );
};

export default User;
