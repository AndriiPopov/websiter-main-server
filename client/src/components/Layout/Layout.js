
import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Spinner from '../UI/Spinner/Spinner';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    drawerToggleClickedHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    
    
    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    drawerClicked={this.drawerToggleClickedHandler} />
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                { this.props.loading
                    ? <Spinner />
                    : <main className={classes.Content}>
                        {this.props.children}
                    </main>
                }
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.website.loading
    };
};

export default connect(mapStateToProps)(Layout);