import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Dash from './components/Dash';
import Profile from './components/Profile';
import Search from './components/Search';
import Login from './components/Login';

export default (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/dash' component={Dash}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/search' component={Search}/>
        </Switch>
    </HashRouter>
);