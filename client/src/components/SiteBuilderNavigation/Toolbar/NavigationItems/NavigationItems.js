import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import * as actions from '../../../../store/actions/index';
import NavigationItem from './NavigationItem/NavigationItem';
import UndoRedo from './UndoRedo/UndoRedo';
import NavigationItemButtonDropDown from './NavigationItemButtonDropDown/NavigationItemButtonDropDown';
import NavigationItemButton from './NavigationItemButton/NavigationItemButton';
import Aux from '../../../../hoc/Aux';
import PagesMenu from '../ToolsSet/DropDownMenus/PagesMenu/PagesMenu';
import BuilderZoomMenu from '../ToolsSet/DropDownMenus/BuilderZoomMenu/BuilderZoomMenu';

export const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        { !props.previewIsOn ?
                <Aux>
                    <NavigationItem type='sections'>Sections</NavigationItem>
                    <NavigationItem type='boxes'>Boxes</NavigationItem>
                    <NavigationItem type='text'>Text</NavigationItem>
                </Aux>
            : null
        }

        <ul className={classes.NavigationItemsRight}>
            <NavigationItemButtonDropDown
                icon='<svg width="24" height="24" viewBox="0 0 24 24"><path d="M1 5h2v14H1zm4 0h2v14H5zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM11 17l2.5-3.15L15.29 16l2.5-3.22L21 17H11z"></path></svg>'
                width="500">
                <PagesMenu />
            </NavigationItemButtonDropDown>
            <NavigationItemButton
                active={props.previewIsOn} 
                clicked={() => props.previewClicked()}
                icon='<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>' />
            <NavigationItemButtonDropDown 
                icon='<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>'>
                <BuilderZoomMenu />
            </NavigationItemButtonDropDown>
                
            { !props.previewIsOn ? <UndoRedo /> : null }
        </ul>
    </ul>
);

const mapStateToProps = state => {
    return {
        previewIsOn: state.builder.present.preview
    }
};

const mapDispatchToProps = dispatch => {
    return {
        previewClicked: () => dispatch(actions.previewPage())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);