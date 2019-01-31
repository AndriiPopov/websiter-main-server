import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';
import * as actions from '../../../../../store/actions/index';

export const NavigationItem = props => {
    const addedClasses = [ classes.NavigationItem ];
    if (props.activeItem === props.type) {
        addedClasses.push(classes.active);
    }

    return (
        <li 
            className={addedClasses.join(' ')}
            onClick={() => props.clickItem(props.type)}>
            {props.children}
        </li>
    );
};

NavigationItem.propTypes = {
    activeItem: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    clickItem: PropTypes.func
};

const mapStateToProps = state => {
    return {
        activeItem: state.topMenu.activeTopMenuItem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clickItem: (item) => dispatch(actions.setActiveTopMenuItem(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItem);