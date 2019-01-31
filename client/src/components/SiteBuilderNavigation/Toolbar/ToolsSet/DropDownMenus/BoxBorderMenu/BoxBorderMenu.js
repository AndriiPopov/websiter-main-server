import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';
import ValueInput from '../../../../../UI/ValueInput/ValueInput';
import RangeInput from '../../../../../UI/RangeInput/RangeInput';
import Checkbox from '../../../../../UI/Checkbox/Checkbox';
import BigColorPicker from '../../../../../UI/Buttons/BigColorPicker/BigColorPicker';

export const BoxBorderMenu = props => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>On</td>
                    <td colSpan="2">
                        <Checkbox
                            onChange={(value) => props.changeElementPropertyValue(value, 'borderOn')} />
                    </td>
                </tr>
                <tr>
                    <td>Border color</td>
                    <td colSpan="2">
                        <BigColorPicker
                            color="rgba(0, 0, 0, 1)"
                            boxesValues={props.boxesValues}
                            changedStyleValues={props.changedStyleValues}
                            saveToHistory={() => props.saveToHistory()}
                            changed={color => props.changed(color, 'borderColor')} />
                    </td>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>
                        <RangeInput
                            changed={newValue => props.changed(newValue, 'borderSize')}
                            startValue={props.boxesValues.borderSize}
                            saveToHistory={() => props.saveToHistory()}
                            step="1"
                            min="0"
                            max="20" />
                    </td>
                    <td>
                        <ValueInput
                            startValue={props.boxesValues.borderSize}
                            changed={value => props.changed(value, 'borderSize')} />
                    </td>
                </tr>
                {/* <tr>
                    <td>Radius</td>
                    <td><RangeInput
                        changed="changeElementPropertyValue"
                        valueKey="borderRadius"
                        max="20" /></td>
                    <td><ValueInput 
                        valueKey="borderRadius"
                        changed="changeElementPropertyValue" /></td>
                </tr> */}
                <tr>
                    <td>H offset</td>
                    <td>
                        <RangeInput
                            changed={newValue => props.changed(newValue, 'borderHOffset')}
                            startValue={props.boxesValues.borderHOffset}
                            saveToHistory={() => props.saveToHistory()}
                            valueKey=""
                            min="-20"
                            max="20" />
                        </td>
                    <td>
                        <ValueInput 
                            startValue={props.boxesValues.borderHOffset}
                            changed={value => props.changed(value, 'borderHOffset')} />
                        </td>
                </tr>
                <tr>
                    <td>V offset</td>
                    <td>
                        <RangeInput
                            changed={newValue => props.changed(newValue, 'borderVOffset')}
                            startValue={props.boxesValues.borderVOffset}
                            saveToHistory={() => props.saveToHistory()}
                            min="-20"
                            max="20" />
                        </td>
                    <td>
                        <ValueInput 
                            startValue={props.boxesValues.borderVOffset}
                            changed={value => props.changed(value, 'borderVOffset')} />
                    </td>
                </tr>
                <tr>
                    <td>Blur</td>
                    <td>
                        <RangeInput
                            changed={newValue => props.changed(newValue, 'borderBlur')}
                            saveToHistory={() => props.saveToHistory()}
                            startValue={props.boxesValues.borderBlur}
                            max="20" />
                        </td>
                    <td>
                        <ValueInput 
                            startValue={props.boxesValues.borderBlur}
                            changed={value => props.changed(value, 'borderBlur')} />
                    </td>
                </tr>
                <tr>
                    <td>Inset</td>
                    <td><Checkbox 
                        changed="changeElementPropertyValue"
                        valueKey="borderInset" /></td>
                    <td></td>
                </tr>
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
        changed: (value, valueKey) => dispatch(actions.changeElementPropertyValue(value, valueKey, false, true))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxBorderMenu);
        