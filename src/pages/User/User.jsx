import React from 'react';
import { UserInfo, Repos } from 'components';
import { UserInfoState, ReposState } from 'context';
import './UserStyles.scss';

const User = () => (
    <div className="container">
        <UserInfoState>
            <UserInfo />
        </UserInfoState>
        <ReposState>
            <Repos />
        </ReposState>
    </div>
);

export default User;
