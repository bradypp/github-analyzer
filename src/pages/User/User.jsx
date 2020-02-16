import React from 'react';
import { UserInfo, Repos, Charts } from 'components';
import './UserStyles.scss';

const User = () => (
    <>
        <div className="user user__section-1">
            <UserInfo />
            <Charts />
        </div>

        <div className="user user__section-2">
            <Repos />
        </div>
    </>
);

export default User;
