import React from 'react';
//import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './NavigationItemButton.module.css';
//import * as actions from '../../../../store/actions/index';
import Svg from '../../../../Svg/Svg';

export const NavigationItemButton = props => {
    const addedClasses = [ classes.NavigationItemButton ];
    if (props.disabled) {
        addedClasses.push(classes.disabled);
    }
    if (props.active) {
        addedClasses.push(classes.active);
    }

    return (
        <li 
            className={addedClasses.join(' ')}
            onClick={props.disabled ? null : props.clicked}>
            <Svg icon={props.icon} />
        </li>
    );
};

NavigationItemButton.propTypes = {
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    clicked: PropTypes.func
};

export default NavigationItemButton;