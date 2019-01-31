import React from 'react';
import { connect } from 'react-redux';

import classes from './Toolbar.module.css';
import ToolSet from './ToolsSet/ToolsSet';
import Sections from './ToolsSet/TopMenuSections/Sections';
import Boxes from './ToolsSet/TopMenuSections/Boxes';
import Text from './ToolsSet/TopMenuSections/Text';

export const toolbar = props => (
    <header className={classes.Toolbar}>
        { !props.previewIsOn ?
                <div className={classes.ToolSetsContainer}>
                    <ToolSet title="sections" >
                        <Sections />
                    </ToolSet>
                    <ToolSet title="boxes" >
                        <Boxes />
                    </ToolSet>
                    <ToolSet 
                        title="text"
                        textEditor={props.textEditor} >
                        <Text />
                    </ToolSet>
                </div>
            : null
        }
    </header>
);

const mapStateToProps = (state, props) => {
    return {
        previewIsOn: state.builder.present.preview        
    };
};

export default connect(mapStateToProps)(toolbar);