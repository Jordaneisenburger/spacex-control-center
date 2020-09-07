import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import { shape, string } from 'prop-types';
import { useShipsPage } from '../../../hooks';
import { Section } from '../../section';
import classes from './shipsPage.module.css';

export const ShipsPage = () => {
    const { ships, handleSetSort } = useShipsPage();

    const shipsList = useMemo(() =>
        ships.map(({name, image, id}, index) => (
            <Section key={index}>
                <img src={image} alt={name} className={classes.img}/>
                <Link to={`/ship/${id}`} className={classes.name}>{name}</Link>
            </Section>
        ))
    ,[ships]);

    return (
        <div className={classes.root}>
            <h1>Ships</h1>
            <div className={classes.filters}>
                <h3>Filters</h3>
                <button onClick={() => handleSetSort('')}>
                    Reset
                </button>
                <button onClick={() => handleSetSort('active')}>
                    active
                </button>
                <button onClick={() => handleSetSort('year_built')}>
                    Year built
                </button>
            </div>
            <div className={classes.body}>
                {shipsList.length?shipsList:'loading ships, this could also be placeholders...'}
            </div>
        </div>
    )
};

ShipsPage.propTypes = {
    classes:shape({
        root: string,
        img: string,
        name: string,
        body: string,
        filters: string,
    })
};
