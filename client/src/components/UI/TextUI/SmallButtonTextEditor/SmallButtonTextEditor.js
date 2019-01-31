import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './SmallButtonTextEditor.module.css';
import Svg from '../../../Svg/Svg';

export const SmallButtonTextEditor = props => {

    const handleClick = e => {
        e.preventDefault();
        if(props.textEditor) {
            props.textEditor[props.clicked](props.property, props.value, () => {});
        }
    }

    const classNames = [classes.Button];

    if(props.inline) 
        classNames.push(classes.Inline);

    if(props.textValues[props.property])
        if(!props.value || props.textValues[props.property] === props.value)
            classNames.push(classes.Active);

    return (
        <button 
            className={classNames.join(' ')}
            onClick={(e) => handleClick(e)}>
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

SmallButtonTextEditor.propTypes = {
    isSection: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string,
    clicked: PropTypes.string,
    property: PropTypes.string
};

const mapStateToProps = state => {
    return {
        textValues: state.builder.present.chosenTextValues
    }
}

export default connect(mapStateToProps)(SmallButtonTextEditor);