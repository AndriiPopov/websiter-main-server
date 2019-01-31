import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import * as classes from './UserSettings.css.js';
import * as actions from '../../store/actions/index';
import LoginButton from '../../components/UI/LoginButton/LoginButton';
import Aux from '../../hoc/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';

const WebsiteSettings = props => {
    return (
        <Aux>
            { !props.loading ?
                <LoginButton 
                    clicked={() => props.deleteUser()}
                    btnType="Danger">
                    DELETE MY ACCOUNT
                </LoginButton>
                : <Spinner />
            }
        </Aux>
        
    );
};

WebsiteSettings.propTypes = {
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: () => dispatch(actions.deleteUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteSettings);