import React from 'react';
import ReactDOM from 'react-dom';
import { UserInfoState, ReposState } from 'context';
import App from './App';

ReactDOM.render(
    <UserInfoState>
        <ReposState>
            <App />
        </ReposState>
    </UserInfoState>,
    document.getElementById('root')
);
