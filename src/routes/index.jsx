import React from 'react';
import { Route, Switch } from 'react-router-dom'
import LandingPage from 'pages/LandingPage'
import Login from 'pages/Login'
import Dashboard from "pages/Dashboard"

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
        </Switch>
    );
}

export default Routes;
