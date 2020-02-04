import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, User } from 'pages';
import { GithubState } from 'context/github';

import './styles/main.scss';

const App = () => {
    return (
        <GithubState>
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/user/:login" component={User} />
                    </Switch>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
