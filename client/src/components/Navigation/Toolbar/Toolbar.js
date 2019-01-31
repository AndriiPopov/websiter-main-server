import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../../SiteBuilderNavigation/Toolbar/NavigationItems/NavigationItems';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        { props.location.pathname === '/editor' ?
            <div className={classes.BuilderMenu}>
                <NavigationItems />
            </div>
            : null
        }
    </header>
);

export default withRouter(toolbar);