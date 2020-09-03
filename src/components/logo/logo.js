import React from 'react';
import { shape, string } from 'prop-types';
import { ReactComponent as LogoFile } from './logo.svg';
import classes from './logo.module.css';

export const Logo = () => {

    return (
        <div className={classes.root}>
            <LogoFile />
        </div>
    )
};

Logo.propTypes = {
    classes:shape({
        root: string,
    })
};
