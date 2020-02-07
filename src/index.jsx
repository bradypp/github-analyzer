import React from 'react';
import ReactDOM from 'react-dom';
import { GitHubState } from 'context';
import App from './App';

ReactDOM.render(
    <GitHubState>
        <App />
    </GitHubState>,
    document.getElementById('root')
);
