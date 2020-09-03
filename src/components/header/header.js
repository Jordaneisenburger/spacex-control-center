import React from 'react';
import { shape, string } from 'prop-types';
import { Logo } from '../logo';
import classes from './header.module.css';

export const Header = () => {

    return (
        <div className={classes.root}>
            <div className={classes.logoWrapper}>
                <Logo />
            </div>
        </div>
    )
};

Header.propTypes = {
    classes:shape({
        root: string,
        logoWrapper: string,
    })
};
