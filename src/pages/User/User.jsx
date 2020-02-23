import React from 'react';
import { UserInfo, Repos, Stats, Header } from 'components';
import './UserStyles.scss';

const User = () => (
    <>
        <Header />
        <div className="user user__section-1">
            <UserInfo />
            <Stats />
        </div>

        <div className="user user__section-2">
            <Repos />
        </div>
    </>
);

export default User;
