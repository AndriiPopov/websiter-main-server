import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from '../SmallButton/SmallButton.module.css';
import AUX from '../../../../hoc/Aux';
import DropDownMenu from '../../../../hoc/DropDownMenu/DropDownMenu';
import Svg from '../../../Svg/Svg';

export class SmallButtonDropDown extends Component {
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
                    className={`${classes.Button} ${this.props.inline ? classes.Inline : null}`}
                    onClick={this.handleOpen}>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td  className={classes.Cell}>
                                    <Svg icon={this.props.icon}
                                        className={classes.Svg} />
                                </td>
                                <td className={classes.Cell}>{this.props.title}</td>
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

SmallButtonDropDown.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
};

export default SmallButtonDropDown;