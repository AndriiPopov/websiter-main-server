import React from 'react';
import { Link } from 'react-router-dom';

import burgerLogo from '../../assets/icons/logo.svg';
import classes from './Logo.module.css';

const logo = (props) => (
    <Link 
        to="/dashboard"
        className={classes.Link}>
        <div 
            className={classes.Logo} 
            style={{height: props.height}} >
            <img 
                src={burgerLogo} 
                alt="W"/>
            <span>Websiter</span>
        </div>
    </Link>
);

export default logo;