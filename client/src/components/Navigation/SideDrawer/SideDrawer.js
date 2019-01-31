import React from 'react';
import { connect } from 'react-redux';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import Select from 'react-select';
import * as actions from '../../../store/actions/index';
import Logo from '../../Logo/Logo';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    const handleWebsiteChange = option => {
        const { value } = option;
        if(value === 'new') {
            props.createWebsite();
        } else {
            props.loadWebsite(value);
        }
        props.closed();
    };

    const websiteOptions = props.websites.map(website => {
        return {
            value: website._id,
            label: `${website.title} (${website.domain})`
        }
    });
    websiteOptions.push({
        value: 'new',
        label: 'Add website'
    })

    const currentWebsiteIndex = websiteOptions.findIndex(option => 
        option.value === props._id
    );

    const selectStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontWeight: 300
            };
        },
        singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontWeight: data.value
            };
        },
        control: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                border: isSelected ? 'none' : 'none',
                borderBottom: '1px solid #ccc',
                boxShadow: 'none'
            };
        }

    };

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.LogoContainer}>
                    <Logo />
                </div>
                <div onClick={event => event.stopPropagation()}>
                    <Select
                        className={classes.Select}
                        value={websiteOptions[currentWebsiteIndex]}
                        isClearable={false}
                        isSearchable={false}
                        onChange={handleWebsiteChange}
                        options={websiteOptions}
                        styles={selectStyles} />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth} />
                </nav>
            </div>
        </Aux>                
    );
}

const mapStateToProps = state => {
    return {
        websites: state.website.websites,
        domain: state.website.domain,
        title: state.website.title,
        _id: state.website._id,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createWebsite: () => dispatch(actions.createWebsite()),
        loadWebsite: _id => dispatch(actions.loadWebsite(_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);