import React from 'react';
import { shape, string, node } from 'prop-types';
import classes from './section.module.css';

export const Section = ({ children, title }) => {

    return (
        <div className={classes.root}>
            {title && <h2 className={classes.heading}>{title}</h2>}
            {children}
        </div>
    )
};

Section.propTypes = {
    classes:shape({
        root: string,
    }),
    children: node.isRequired,
    title: string
};
