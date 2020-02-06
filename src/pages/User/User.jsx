import React from 'react';
import { UserInfo, Repos } from 'components';
import './UserStyles.scss';

const User = () => (
    <div className="container container--user">
        <UserInfo />
        <Repos />
    </div>
);

export default User;
