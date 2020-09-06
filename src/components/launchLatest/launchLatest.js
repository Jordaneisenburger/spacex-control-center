import React, { Fragment, useEffect } from 'react';
import { gql } from '@apollo/client';
import { Link } from "react-router-dom";
import { shape, string } from 'prop-types';
import { Section } from '../section';
import { useLaunch } from '../../hooks';
import classes from './launchLatest.module.css';

const GET_LAUNCH_LATEST = gql`
    query LaunchLatest {
        launchLatest {
            id
            mission_name
            launch_success
            launch_date_local
            rocket {
                rocket_name
                rocket_type
                fairings {
                    ship
                }
            }
            launch_site {
                site_name
            }
        }
    }
`;

export const LaunchLatest = () => {

    const {
        runQuery,
        isLoading,
        rocketName,
        launchSuccess,
        missionName,
        launchDate,
        rocketType,
        launchSite,
        recoveryShip
    } = useLaunch({query: GET_LAUNCH_LATEST, launchType: 'launchLatest'});

    useEffect(() => {
        runQuery()
    }, [runQuery]);

    const statusClass = launchSuccess?classes.success:classes.failure;

    return (
        <div className={classes.root}>
            <Section title="Latest Launch">
                {(isLoading)?(
                    'loading'
                ):(
                    <Fragment>
                        <div className={classes.heading}>
                            <div className={classes.name}>
                                <div className={statusClass}/>
                                {missionName}
                            </div>
                            <div className={classes.date}>
                                {launchDate}
                            </div>
                        </div>
                        <div className={classes.body}>
                            <div className={classes.line}><b>Name:</b> {rocketName}</div>
                            <div className={classes.line}><b>Type:</b> {rocketType}</div>
                            <div className={classes.line}><b>Launch site:</b> {launchSite}</div>
                            <div className={classes.line}><b>Recovery ship:</b> {recoveryShip &&
                                <Link to={`/ship/${recoveryShip}`}>{recoveryShip}</Link>}
                            </div>
                        </div>
                    </Fragment>
                )}
            </Section>
        </div>
    )
};

LaunchLatest.propTypes = {
    classes:shape({
        root: string,
        name: string,
        date: string,
        heading: string,
        failure: string,
        success: string
    })
};
