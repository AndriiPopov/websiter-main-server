import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import _ from 'lodash';

import classes from './SmallColorPickerTextEditor.module.css';
import Aux from '../../../../hoc/Aux';
import SmallButton from '../../Buttons/SmallButton/SmallButton';
import Checkbox from '../../Checkbox/Checkbox';
import DropDownMenu from '../../../../hoc/DropDownMenu/DropDownMenu';
import { rgbaToObj, objToRgba } from '../../../../utils/colorUtils';

export class SmallColorPickerTextEditor extends Component {
    state = {
        isVisible: false
    };

    handleOpen = () => {
        this.setState({ isVisible: !this.state.isVisible })
    };

    handleClose = () => {
        this.setState({ isVisible: false })
    };

    handleChange = color => {
        const { props } = this;
        const rgba = objToRgba(color);
        if (props.textEditor && rgba !== this.startControlColor) {
            props.textEditor[props.changed](props.property, rgba, () => {});
        }
    }

    render() {
        const { props } = this;
        this.startButtonColor = this.startControlColor = props.textValues[_.camelCase(props.property)] || 'rgba(200, 200, 200, 1)';

        return (
            <Aux>
                <button
                    className={classes.Button}
                    onClick={() => this.handleOpen()}>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td>{props.title}</td>
                                <td>
                                    <div className={classes.ColorDiv}
                                        style={{ background: this.startButtonColor || 'rgba(200, 200, 200, 1)' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </button>
                {this.state.isVisible ?
                    <DropDownMenu close={this.handleClose}>
                        <table>
                            <tbody>
                                {props.withOnCheckbox ?
                                    <tr>
                                        <td>On</td>
                                        <td className={classes.OnCheckbox}>
                                            <Checkbox
                                                isSection={props.isSection}
                                                changed="changeElementPropertyValue"
                                                valueKey={props.onOffValue} />
                                        </td>
                                    </tr> : null
                                }
                                <tr>
                                    <td colSpan="2">
                                        <SketchPicker
                                            color={rgbaToObj(this.startControlColor || 'rgba(200, 200, 200, 1)')}
                                            onChange={this.handleChange} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DropDownMenu> : null
                }
                {props.changedStyleValues.includes(props.valueKey) ?
                    <div className={classes.StyleControls}>
                        <SmallButton
                            isSection={props.isSection}
                            value={props.valueKey}
                            icon='<svg width="16px" height="16px" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M15 1H9v2h6V1zm4.03 6.39l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-.32-5H6.35c.57 1.62 1.82 2.92 3.41 3.56l-.11-.06 2.03-3.5zm5.97-4c-.57-1.6-1.78-2.89-3.34-3.54L12.26 11h5.39zm-7.04 7.83c.45.11.91.17 1.39.17 1.34 0 2.57-.45 3.57-1.19l-2.11-3.9-2.85 4.92zM7.55 8.99C6.59 10.05 6 11.46 6 13c0 .34.04.67.09 1h4.72L7.55 8.99zm8.79 8.14C17.37 16.06 18 14.6 18 13c0-.34-.04-.67-.09-1h-4.34l2.77 5.13zm-3.01-9.98C12.9 7.06 12.46 7 12 7c-1.4 0-2.69.49-3.71 1.29l2.32 3.56 2.72-4.7z" ></path></svg>'
                            clicked="transition" />
                        <SmallButton
                            isSection={props.isSection}
                            value={props.valueKey}
                            icon='<svg width="16px" height="16px" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" ></path></svg>'
                            clicked="clearStyle" />
                    </div> : null
                }
            </Aux>
        );
    }
};

SmallButton.propTypes = {
    valueKey: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    textValues: PropTypes.object,
    changed: PropTypes.func
};

const mapStateToProps = state => {
    return {
        textValues: state.builder.present.chosenTextValues,
        changedStyleValues: []
    }
}

export default connect(mapStateToProps)(SmallColorPickerTextEditor);