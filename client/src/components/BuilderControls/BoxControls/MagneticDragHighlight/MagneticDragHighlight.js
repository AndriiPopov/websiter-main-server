/*
    This creates a line and highlights the element that is magnetized to on box drag
    It is used for both horizontal and vertical highlights
*/

import React from 'react';
import PropTypes from 'prop-types';

import * as classes from './MagneticDragHighlight.css.js';
import AUX from '../../../../hoc/Aux';

export const MagneticDragHighlight = props => {
    return (
        <AUX>
            <div style={{...classes.HighlightLine,
                width: props.line.width + 'px',
                height: props.line.height + 'px',
                left: props.line.left + 'px',
                top: props.line.top + 'px'}} />
            <div style={{...classes.HighlightElement,
                width: props.element.width + 'px',
                height: props.element.height + 'px',
                left: props.element.left + 'px',
                top: props.element.top + 'px'}} />
        </AUX>
    );
};

MagneticDragHighlight.propsTypes = {
    line: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
    }),
    element: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
    })
}

export default MagneticDragHighlight;