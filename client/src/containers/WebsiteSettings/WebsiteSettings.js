import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import * as classes from './WebsiteSettings.css.js';
import * as actions from '../../store/actions/index';
import LoginInput from '../../components/UI/LoginInput/LoginInput';
import LoginButton from '../../components/UI/LoginButton/LoginButton';
import Aux from '../../hoc/Aux';

class WebsiteSettings extends Component {
    state = {
        controls: {
            title: {
                label: 'Name',
                type: 'text',
                placeholder: 'Website name',
                value: this.props.title || '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            domain: {
                label: 'Domain',
                type: 'text',
                placeholder: 'Domain',
                value: this.props.domain || '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        }
    };
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

    saveHandler = () => {
        let title, domain;
        if (this.state.controls.title.valid) {
            title = this.state.controls.title.value;
        }
        if (this.state.controls.domain.valid) {
            domain = this.state.controls.domain.value;
        }
        this.props.saveWebsiteSettings(this.props._id, title, domain)
    }

    render () {
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
                label={formElement.config.label} />
        ));
        return (
            <Aux>
                {form}
                <LoginButton 
                    clicked={this.saveHandler}
                    btnType="Success">
                    SAVE
                </LoginButton>
                <LoginButton 
                    clicked={() => this.props.deleteWebsite(this.props._id)}
                    btnType="Danger">
                    DELETE
                </LoginButton>
            </Aux>
        );
    }
};

WebsiteSettings.propTypes = {
};

const mapStateToProps = state => {
    return {
        title: state.website.title,
        domain: state.website.domain,
        _id: state.website._id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveWebsiteSettings: (_id, title, domain) => dispatch(actions.saveWebsiteSettings(_id, title, domain)),
        deleteWebsite: _id => dispatch(actions.deleteWebsite(_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteSettings);