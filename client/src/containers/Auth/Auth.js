import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import LoginInput from '../../components/UI/LoginInput/LoginInput';
import LoginButton from '../../components/UI/LoginButton/LoginButton';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                label: 'Email',
                type: 'email',
                placeholder: 'Mail address',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password',
                type: 'password',
                placeholder: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                isPassword: true,
                isPasswordVisible: false
            }
        }
    };

    responseFacebook = response => {
        console.log(response);
    }

    responseGoogle = response => {
        console.log(response);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = new RegExp('/^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/');
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({controls: updatedControls});
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.isSignup);
    }

    handleTogglePasswordVisible = () => {
        this.setState({
            controls: {
                ...this.state.controls,
                password: {
                    ...this.state.controls.password,
                    isPasswordVisible: !this.state.controls.password.isPasswordVisible
                }
            }
        });
    }

    handleRememberMe = (e) => {
        this.setState({
            rememberMe: e.target.checked
        });
    }

    render () {
        const isSignup = this.props.location.pathname === '/signup';
        this.isSignup = isSignup;
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementsArray.map(formElement => (
            <LoginInput 
                key={formElement.id}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.label}
                password={formElement.config.isPassword}
                passwordVisible={formElement.config.isPasswordVisible}
                togglePasswordVisible={this.handleTogglePasswordVisible} />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.data}</p>
            );
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={'/dashboard'} />
        }

        const title = isSignup ? 'Sign Up' : 'Log In';

        const subtitile = isSignup ? 
            <div>Have an account? <Link to="/login" className={classes.Link} >Log In</Link></div>
            : <div>Don't have an account? <Link to="/signup" className={classes.Link} >Sign Up</Link></div>

        const forgotPassword = isSignup ?
            <div className={classes.ForgotPassword} >Forgot Password?</div>
            : null;


        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form
                    className={classes.Form}
                    onSubmit={this.submitHandler}>
                    <div className={classes.Title}>
                        {title}
                    </div>
                    <div className={classes.Subtitle}>
                        {subtitile}
                    </div>
                    <div className={classes.ActionBlock}>
                        <div>
                            {form}
                            <div className={classes.RememberForgot}>
                                <div>
                                    <label className={classes.RememberMeLabel}>
                                        <input
                                            type="checkbox"
                                            className={classes.RememberMe}
                                            onChange={this.handleRememberMe} />
                                        Remember Me
                                    </label>
                                </div>
                                {forgotPassword}
                            </div>
                            {errorMessage}
                            <LoginButton btnType="Success">
                                {title}
                            </LoginButton>
                        </div >
                        <div className={classes.Middle} />
                        <div>
                            <FacebookLogin
                                appId="1088597931155576"
                                autoLoad={true}
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick}>
                                        Continue with Facebook
                                    </button>
                                )} />
                            <GoogleLogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick}>
                                        Continue with Google
                                    </button>
                                )} />
                        </div>
                    </div>
                </form>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);