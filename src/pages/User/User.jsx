import React from 'react';
import { UserInfo, Repos } from 'components';
import './UserStyles.scss';

const User = props => (
    <>
        <UserInfo />
        <Repos />
    </>
);

export default User;
