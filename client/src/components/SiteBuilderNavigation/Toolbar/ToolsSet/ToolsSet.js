import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './ToolsSet.module.css';

export const ToolsSet = props => {
    return (
        <table 
            className={props.activeTopMenuItem === props.title || props.isActive ? [ classes.ToolsSet, classes.active ].join(' ') : classes.ToolsSet}>
            <tbody>
                <tr>
                    {props.children}
                </tr>
            </tbody>
        </table>
    );
};

ToolsSet.propTypes = {
    activeTopMenuItem: PropTypes.oneOf(['sections', 'boxes', 'text'])
};

const mapStateToProps = state => {
    return {
        activeTopMenuItem: state.topMenu.activeTopMenuItem,
    };
};

export default connect(mapStateToProps)(ToolsSet);