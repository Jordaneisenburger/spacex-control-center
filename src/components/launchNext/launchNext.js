import React, { Fragment, useEffect } from 'react';
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

    const { runQuery, isLoading, data } = useLaunch({query: GET_LAUNCH_NEXT, launchType: 'launchNext'});

    useEffect(() => {
        runQuery({
            variables: { offset: 0 }
        });
    }, [runQuery]);

    const statusClass = data?.launch_success?classes.success:data?.launch_success === null?classes.unknown:classes.failure;

    return (
        <div className={classes.root}>
            <Section title="Next Launch">
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
                        <div className={classes.footer}>
                            <button onClick={() => runQuery({ variables: { offset: 1 } })}>View Next launch</button>
                        </div>
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
