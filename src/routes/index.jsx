import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import LandingPage from 'pages/LandingPage';
import Login from 'pages/Login';
import Dashboard from "pages/Dashboard";

const Routes = () => {
    return (
        <AnimatePresence exitBeforeEnter>
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
        </AnimatePresence>

    );
}

export default Routes;
