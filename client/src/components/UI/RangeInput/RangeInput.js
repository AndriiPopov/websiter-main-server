import React from 'react';
import PropTypes from 'prop-types';

import classes from './RangeInput.module.css';

const RangeInput = props => {

    const handleChange = (e) => {
        let value = parseInt(e.target.value) || 0;
        if(props.min && value < props.min ) {
            value = props.min;
        }
        props.changed(value);
        hasBeenChanged = true;
    }

    let hasBeenChanged = false;
    const handleMouseDown = () => {

        hasBeenChanged = false;

        const dragStart = callbackStop => {
            const dragMouseUp = () => {
                window.removeEventListener('mouseup', dragMouseUp);
                callbackStop();
            }
            window.addEventListener('mouseup', dragMouseUp);
        }

        dragStart( () => {
            if (hasBeenChanged) {
                if(props.saveToHistory) {
                    props.saveToHistory();
                }
            }
        });
    };

    return (
        <div className={classes.Div}>
            {props.title}
            <input
                type="range"
                className={classes.Input}
                value={props.startValue}
                onChange={handleChange}
                step={props.step || 1}
                min={props.min || 0}
                max={props.max || 100}
                onMouseDown={handleMouseDown} />
        </div>
    );
};

RangeInput.propTypes = {
    sectionValues: PropTypes.object,
    boxesValues: PropTypes.object,
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSection: PropTypes.bool,
    valueKey: PropTypes.string.isRequired,
    title: PropTypes.string,
    saveToHistory: PropTypes.func.isRequired,
    changed: PropTypes.func
};

export default RangeInput;