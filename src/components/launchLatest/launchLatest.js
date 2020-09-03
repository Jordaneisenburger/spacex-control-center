import React, { Fragment, useEffect } from 'react';
import { gql } from '@apollo/client';
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

    const { runQuery, isLoading, data } = useLaunch({query: GET_LAUNCH_LATEST, launchType: 'launchLatest'});

    useEffect(() => {
        runQuery()
    }, [runQuery]);

    const statusClass = data?.launch_success?classes.success:classes.failure;

    return (
        <div className={classes.root}>
            <Section title="Latest Launch">
                {(isLoading || !data)?(
                    'loading'
                ):(
                    <Fragment>
                        <div className={classes.heading}>
                            <div className={classes.name}>
                                <div className={statusClass}/>
                                {data.mission_name}
                            </div>
                            <div className={classes.date}>
                                {data.launch_date_local}
                            </div>
                        </div>
                        <div className={classes.body}>
                            <div className={classes.line}><b>Name:</b> {data.rocket.rocket_name}</div>
                            <div className={classes.line}><b>Type:</b> {data.rocket.rocket_type}</div>
                            <div className={classes.line}><b>Launch site:</b> {data.launch_site.site_name}</div>
                            <div className={classes.line}><b>Recovery ship:</b> {data.rocket.fairings.ship}</div>
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
