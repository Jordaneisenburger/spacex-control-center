import React, { useMemo, Fragment } from 'react';
import {
    useParams
} from "react-router-dom";
import { shape, string } from 'prop-types';
import { useShipPage } from '../../../hooks';
import classes from './shipPage.module.css';

export const ShipPage = () => {
    const { shipId } = useParams();
    const { name, image, roles, yearBuilt, homePort, missions } = useShipPage({shipId:shipId});

    const roleList = roles.map((role, index) => <span key={index}>{role}{index?(','):null}</span>);

    const missionList = useMemo(() =>
        missions.map(({name, flight}, index) =>
            <li key={index}>
                {name && <span>{name}</span>}
                {flight && <span>{flight}</span>}
            </li>
        )
    ,[missions]);

    return (
        <div className={classes.root}>
            <div className={classes.heading} style={{backgroundImage: `url(${image})`}}>
                <div className={classes.name}>{name}</div>
            </div>
            <div className={classes.body}>
                {roleList.length?(
                    <div className={classes.label}>Roles: {roleList}</div>
                ):null}
                <div className={classes.label}>Year Build: {yearBuilt}</div>
                <div className={classes.label}>Home Port: {homePort}</div>
                {missions.length?(
                    <Fragment>
                        <div className={classes.label}>Missions:</div>
                        <ul>
                            {missionList}
                        </ul>
                    </Fragment>
                ):null}
            </div>
        </div>
    )
};

ShipPage.propTypes = {
    classes:shape({
        root: string,
        heading: string,
        img: string,
        name: string,
        body: string,
    })
};
