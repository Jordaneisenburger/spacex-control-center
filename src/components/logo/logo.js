import React from 'react';
import { shape, string } from 'prop-types';
import { Link } from "react-router-dom";
import { ReactComponent as LogoFile } from './logo.svg';
import classes from './logo.module.css';

export const Logo = () => {

    return (
        <Link className={classes.root} to="/">
            <LogoFile />
        </Link>
    )
};

Logo.propTypes = {
    classes:shape({
        root: string,
    })
};
