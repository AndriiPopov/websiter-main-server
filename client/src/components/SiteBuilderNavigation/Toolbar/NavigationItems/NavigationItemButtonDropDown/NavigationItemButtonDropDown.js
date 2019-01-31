import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItemButtonDropDown.module.css';
import Svg from '../../../../Svg/Svg';
import AUX from '../../../../../hoc/Aux';
import DropDownMenu from '../../../../../hoc/DropDownMenu/DropDownMenu';

export class NavigationItemButtonDropDown extends Component {
    state = {
        isVisible: false
    };

    handleOpen = () => {
        this.setState({ isVisible: !this.state.isVisible })
    };
    
    handleClose = () => {
        this.setState({ isVisible: false })
    };

    render () {
        return (
            <AUX>
                <li className={classes.NavigationItemButtonDropDown}
                    onClick={this.handleOpen}>
                    <Svg icon={this.props.icon} />
                </li>
                { this.state.isVisible ? 
                    <DropDownMenu 
                        close={this.handleClose}
                        isTopMenu
                        width={this.props.width} >
                        {this.props.children}
                    </DropDownMenu> : null 
                }
            </AUX>
        );
    };
};

NavigationItemButtonDropDown.propTypes = {
    icon: PropTypes.string,
    dropDownType: PropTypes.oneOf(['pageZoom', 'pagesMenu'])
};

export default NavigationItemButtonDropDown;