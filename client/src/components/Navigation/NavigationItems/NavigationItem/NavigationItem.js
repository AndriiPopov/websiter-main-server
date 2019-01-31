import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';
import Svg from '../../../Svg/Svg';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact
            activeClassName={classes.Active} >
            <Svg icon={props.icon}/>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;