import React from 'react';
import { UserInfo, Repos, Stats } from 'components';
import './UserStyles.scss';

const User = () => (
    <>
        <div className="container">
            <UserInfo />
            <Stats />
        </div>
        <div className="container">
            <Repos />
        </div>
    </>
);

export default User;
