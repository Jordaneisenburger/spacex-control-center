import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import { shape, string } from 'prop-types';
import { Header } from '../header';
import { Dashboard } from '../rootComponents';
import classes from './app.module.css';

export const App = () => {

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.bodyWrapper}>
                <aside className={classes.aside}>aside</aside>
                <main className={classes.main}>
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        {/*<Route path="/about">*/}
                        {/*    <About />*/}
                        {/*</Route>*/}
                        {/*<Route path="/dashboard">*/}
                        {/*    <Dashboard />*/}
                        {/*</Route>*/}
                    </Switch>
                </main>
            </div>
            <footer>footer</footer>
        </div>
    )
};

App.propTypes = {
    classes:shape({
        root: string,
        bodyWrapper: string,
        header: string,
        main: string,
    })
};
