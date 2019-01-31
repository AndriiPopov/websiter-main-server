import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as classes from './ControlSectionHeight.css.js';
import * as actions from '../../../../store/actions/index';
import { dragStart } from '../../../../utils/dragFunction';

export const ControlSectionHeight = props => {
    const handleDragMouseDown = (e) => {
        const startElY = props.section.height;

        dragStart(e, (difX, difY) => {
            let value = startElY + difY;
            if (value < 0) {
                value = 0;
            }
            props.changed(value, 'height');
        }, () => {});
    };

    return !props.previewIsOn ?
        <div style={classes.SectionHeight}
            onMouseDown={handleDragMouseDown}>
            Height
        </div>
        : null;
};

ControlSectionHeight.propTypes = {
    section: PropTypes.shape({
        type: PropTypes.oneOf(['section']).isRequired,
        height: PropTypes.number.isRequired,
        children: PropTypes.arrayOf(PropTypes.string).isRequired,
        styles: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    id: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        section: state.builder.present[props.id],
        previewIsOn: state.builder.present.preview        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changed: (newValue, valueKey) => dispatch(actions.changeElementPropertyValue(newValue, valueKey, true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlSectionHeight);