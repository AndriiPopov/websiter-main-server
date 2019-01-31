import React from 'react';
import PropTypes from 'prop-types';

import classes from './BigButtonWithCheckbox.module.css';
import Svg from '../../../Svg/Svg';

export const BigButtonWithCheckbox = props => {
    return (
        <button 
            className={classes.Button}
            onClick={props.clicked}>
            <table className={classes.Table}>
                <tbody>
                    <tr>
                        <td><Svg icon={props.icon}/></td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                type="checkbox" 
                                onChange={() => {}}
                                checked={props.checked || false} /> 
                            {props.title}
                        </td>
                    </tr>
                </tbody>
            </table>
        </button>
    );
};

BigButtonWithCheckbox.propTypes = {
    isSection: PropTypes.bool,
    valueKey: PropTypes.string,
    title: PropTypes.string,
    checked: PropTypes.bool,
    icon: PropTypes.string,
    clicked: PropTypes.func
};

export default BigButtonWithCheckbox;