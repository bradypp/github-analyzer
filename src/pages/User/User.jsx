import React from 'react';
import { UserInfo, Repos } from 'components';
import './UserStyles.scss';

const User = () => (
    <>
        <div className="container">
            <UserInfo />
        </div>
        <div className="container">
            <Repos />
        </div>
    </>
);

export default User;
