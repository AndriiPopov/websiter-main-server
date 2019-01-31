import React from 'react';
import PropTypes from 'prop-types';

import classes from './BigButton.module.css';
import Svg from '../../../Svg/Svg';

export const BigButton = props => {
    return (
        <button 
            className={classes.Button}
            onClick={props.buttonClicked}>
            <table className={classes.Table}>
                <tbody>
                    <tr>
                        <td><Svg icon={props.icon}/></td>
                    </tr>
                    <tr>
                        <td>{props.title}</td>
                    </tr>
                </tbody>
            </table>
        </button>
    );
};

BigButton.propTypes = {
    title: PropTypes.string,
    buttonClicked: PropTypes.func,
    icon: PropTypes.string
};

export default BigButton;