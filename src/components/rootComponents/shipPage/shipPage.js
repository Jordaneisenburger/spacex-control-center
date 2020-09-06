import React from 'react';
import {
    useParams
} from "react-router-dom";
import { shape, string } from 'prop-types';
import classes from './shipPage.module.css';

export const ShipPage = () => {
    const { shipId } = useParams();

    return (
        <div className={classes.root}>
            {shipId}
        </div>
    )
};

ShipPage.propTypes = {
    classes:shape({
        root: string,
    })
};
