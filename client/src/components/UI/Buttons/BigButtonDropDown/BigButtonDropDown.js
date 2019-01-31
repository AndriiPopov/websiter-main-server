import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BigButtonDropDown.module.css';
import AUX from '../../../../hoc/Aux';
import DropDownMenu from '../../../../hoc/DropDownMenu/DropDownMenu';
import Svg from '../../../Svg/Svg';

export class BigButtonDropDown extends Component {
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
                <button 
                    className={classes.Button}
                    onClick={this.handleOpen}>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td><Svg icon={this.props.icon}/></td>
                            </tr>
                            <tr>
                                <td>{this.props.title}</td>
                            </tr>
                        </tbody>
                    </table>
                </button>
                { this.state.isVisible ? 
                    <DropDownMenu close={this.handleClose}>
                        {this.props.children}
                    </DropDownMenu> : null 
                }
            </AUX>
        );
    };
};

BigButtonDropDown.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
};

export default BigButtonDropDown;