import React from 'react';
import PropTypes from 'prop-types';

import classes from './SmallButton.module.css';
import Svg from '../../../Svg/Svg';

export const SmallButton = props => {
    return (
        <button 
            className={`${classes.Button} ${props.inline ? classes.Inline : null}`}
            onClick={props.buttonClicked}>
            <table className={classes.Table}>
                <tbody>
                    <tr>
                        <td className={classes.Cell}>
                            <Svg icon={props.icon}
                                className={classes.Svg} />
                        </td>
                        <td className={classes.Cell}>{props.title}</td>
                    </tr>
                </tbody>
            </table>
        </button>
    );
};

SmallButton.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string,
    buttonClicked: PropTypes.func
};

export default SmallButton;