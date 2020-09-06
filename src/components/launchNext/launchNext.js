import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { gql } from '@apollo/client';
import { shape, string } from 'prop-types';
import { Section } from '../section';
import { useLaunch } from '../../hooks';
import classes from './launchNext.module.css';

const GET_LAUNCH_NEXT = gql`
    query LaunchNext($offset: Int) {
        launchNext(offset: $offset) {
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

export const LaunchNext = () => {
    const [offset, setOffset] = useState(0);
    const {
        runQuery,
        isLoading,
        data,
        rocketName,
        launchSuccess,
        missionName,
        launchDate,
        rocketType,
        launchSite,
        recoveryShip
    } = useLaunch({query: GET_LAUNCH_NEXT, launchType: 'launchNext'});

    useEffect(() => {
        runQuery({
            variables: { offset: offset}
        });
    }, [runQuery, offset]);

    const nextLaunchHandler = useCallback(() => {
        runQuery({ variables: { offset: offset + 1} });
        setOffset(offset + 1);
    },[runQuery, offset]);

    const statusClass = launchSuccess?classes.success:launchSuccess === null?classes.unknown:classes.failure;

    return (
        <div className={classes.root}>
            <Section title="Next Launch">
                {(isLoading)?(
                    'loading'
                ):(data === null)?(
                    <div>No more launches</div>
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
                            <div className={classes.line}><b>Recovery ship:</b> {recoveryShip}</div>
                        </div>
                        <div className={classes.footer}>
                            <button onClick={nextLaunchHandler} className={classes.button}>View Next launch</button>
                        </div>
                    </Fragment>
                )}
            </Section>
        </div>
    )
};

LaunchNext.propTypes = {
    classes:shape({
        root: string,
        name: string,
        date: string,
        heading: string,
        failure: string,
        success: string,
        unknown: string,
    })
};
