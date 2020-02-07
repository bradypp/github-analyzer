import React from 'react';
import { UserInfo, Repos, Stats } from 'components';
import './UserStyles.scss';

const User = () => (
    <>
        <div className="container user-section-1">
            <UserInfo />
            <Stats />
        </div>
        <div className="container user-section-2">
            <Repos />
        </div>
    </>
);

export default User;
