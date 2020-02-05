import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, User } from 'pages';
import './styles/main.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/user/:login" component={User} />
            </Switch>
        </Router>
    );
};

export default App;
