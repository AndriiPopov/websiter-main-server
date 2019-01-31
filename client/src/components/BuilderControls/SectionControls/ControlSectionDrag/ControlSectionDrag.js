import React from 'react';
import { connect } from 'react-redux';

import * as classes from './ControlSectionDrag.css.js';

export const ControlSectionDrag = props => {
    return !props.previewIsOn ? 
        <div style={props.chosenSection === props.id ? {...classes.SectionDrag, background: 'green'} : classes.SectionDrag }></div>
        : null;
};

const mapStateToProps = state => {
    return {
        chosenSection: state.builder.present.chosenSection,
        previewIsOn: state.builder.present.preview        
    };
};

export default connect(mapStateToProps)(ControlSectionDrag);