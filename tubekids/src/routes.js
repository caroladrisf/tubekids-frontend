import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import Playlist from './components/Playlist';
import Profiles from './components/Profiles';
import Home from './components/Home';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/playlist" component={Playlist}/>
            <Route exact path="/profiles" component={Profiles}/>
            <Route exact path="/" component={Home}/>
        </Switch>
    </App>;

export default AppRoutes;
