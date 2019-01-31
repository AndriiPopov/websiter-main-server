import React from 'react';
import { connect } from 'react-redux';
 
import Aux from '../../hoc/Aux';
import classes from './SiteBuilderLayout.module.css';
import Toolbar from '../SiteBuilderNavigation/Toolbar/Toolbar';

export const SiteBuilderLayout = props => {
    return (
        <Aux>
            <Toolbar textEditor={props.textEditor} />
            <main className={!props.previewIsOn ? classes.Content : classes.ContentPreview}>
                {props.children}
            </main>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        previewIsOn: state.builder.present.preview        
    };
};

export default connect(mapStateToProps)(SiteBuilderLayout);