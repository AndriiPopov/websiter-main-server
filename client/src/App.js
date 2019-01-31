import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Logout from './containers/Auth/Logout/Logout';
import './App.css';
import asyncComponent from './hoc/asyncComponent'
import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';
import Layout from './components/Layout/Layout';

const asyncWebsiteDashboard = asyncComponent(() =>{
  return import ('./containers/WebsiteDashboard/WebsiteDashboard');
});

const asyncSiteBuilder = asyncComponent(() =>{
  return import ('./containers/SiteBuilder/SiteBuilder');
});

const asyncWebsiteSettings = asyncComponent(() =>{
  return import ('./containers/WebsiteSettings/WebsiteSettings');
});

const asyncUserSettings = asyncComponent(() =>{
  return import ('./containers/UserSettings/UserSettings');
});

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes= (
        <Layout>
          <Switch>
            <Route path="/dashboard" component={asyncWebsiteDashboard} />
            <Route path="/editor" component={asyncSiteBuilder} />
            <Route path="/settings" component={asyncWebsiteSettings} />
            <Route path="/user" component={asyncUserSettings} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
      );
    };

    return routes;
  }
}


const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
