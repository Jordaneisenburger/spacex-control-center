import React from 'react';
import { shape, string } from 'prop-types';
import { LaunchLatest } from '../../launchLatest';
import { LaunchNext } from '../../launchNext';
import classes from './dashboard.module.css';

export const Dashboard = () => {

    return (
        <div className={classes.root}>
            <LaunchLatest />
            <LaunchNext />
        </div>
    )
};

Dashboard.propTypes = {
    classes:shape({
        root: string,
    })
};
