import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';
import ValueInput from '../../../../../UI/ValueInput/ValueInput';
import RangeInput from '../../../../../UI/RangeInput/RangeInput';
import Checkbox from '../../../../../UI/Checkbox/Checkbox';
import TextInput from '../../../../../UI/TextInput/TextInput';

export const GoogleMapMenu = props => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>On</td>
                    <td colSpan="2">
                        <Checkbox
                            isSection={props.isSection}
                            onChange={(value) => props.changeElementPropertyValue(value, 'mapOn')} />
                    </td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td colSpan="2"><TextInput
                        isSection={props.isSection}
                        changed="changeElementPropertyValue"
                        valueKey="mapAddress" /></td>
                </tr>
                <tr>
                    <td>Zoom</td>
                    <td><RangeInput
                        isSection={props.isSection}
                        changed="changeElementPropertyValue"
                        valueKey="mapZoom"
                        min="0"
                        max="21" /></td>
                    <td><ValueInput
                        isSection={props.isSection}
                        min="0"
                        max="21" 
                        valueKey="mapZoom"
                        changed="changeElementPropertyValue" /></td>
                </tr>
                <tr>
                    <td>Satellite type</td>
                    <td colSpan="2">
                        <Checkbox
                            isSection={props.isSection}
                            onChange={(value) => props.changeElementPropertyValue(value, 'mapSatellite')} />
                        </td>
                </tr>
                { props.isSection ? 
                    <tr>
                        <td>Page wide</td>
                        <td colSpan="2">
                            <Checkbox
                                isSection={props.isSection}
                                onChange={(value) => props.changeElementPropertyValue(value, 'mapOuter')} />
                            </td>
                    </tr> : null
                }
            </tbody>
        </table>
    );
};

const mapStateToProps = state => {
    return {
        boxesValues: state.builder.present.chosenBoxesValues,
        changedStyleValues: state.builder.present.changedStyleValues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveToHistory: () => { dispatch(actions.saveToHistory()) },
        changed: (color, valueKey) => dispatch(actions.changeElementPropertyValue(color, valueKey, false, true))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapMenu);