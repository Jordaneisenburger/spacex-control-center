import React from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { shape, string } from 'prop-types';
import { Header } from '../header';
import { Dashboard, ShipPage, ShipsPage } from '../rootComponents';
import classes from './app.module.css';

export const App = () => {

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.bodyWrapper}>
                <aside className={classes.aside}>
                    <nav className={classes.nav}>
                        <Link to="/ships">View all ships</Link>
                    </nav>
                </aside>
                <main className={classes.main}>
                    <Switch>
                        <Route exact path={`/ships`}>
                            <ShipsPage />
                        </Route>
                        <Route path={`/ship/:shipId`}>
                            <ShipPage />
                        </Route>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
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
        nav: string,
        aside: string,
    })
};
