import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';
import ToolsSection from '../ToolsSection/ToolsSection';
import ToolsBlock from '../ToolsSection/ToolsBlock/ToolsBlock';
import Aux from '../../../../../hoc/Aux';
import BigButton from '../../../../UI/Buttons/BigButton/BigButton';
import SmallButton from '../../../../UI/Buttons/SmallButton/SmallButton';
import BigColorPicker from '../../../../UI/Buttons/BigColorPicker/BigColorPicker';
import ValueInput from '../../../../UI/ValueInput/ValueInput';
import Checkbox from '../../../../UI/Checkbox/Checkbox';
import BigButtonDropDown from '../../../../UI/Buttons/BigButtonDropDown/BigButtonDropDown';
import SmallButtonDropDown from '../../../../UI/Buttons/SmallButtonDropDown/SmallButtonDropDown';
import BoxAlignMenu from '../DropDownMenus/BoxAlignMenu/BoxAlignMenu';
import GoogleMapMenu from '../DropDownMenus/GoogleMapMenu/GoogleMapMenu';
import BoxBorderMenu from '../DropDownMenus/BoxBorderMenu/BoxBorderMenu';

const Boxes = props => {
    return (
        <Aux>
            <ToolsSection label="Basic">
                <ToolsBlock blockType="one">
                    <BigButton
                        title="Add"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>'
                        buttonClicked={() => props.addBox()} />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Duplicate"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.duplicateBox()} />
                    <SmallButton
                        title="Delete"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>'
                        buttonClicked={() => props.deleteBox()} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Style" >
                <ToolsBlock blockType="one" >
                    <BigColorPicker
                        title="Background"
                        color="rgba(30, 250, 100, 1)"
                        boxesValues={props.boxesValues}
                        changedStyleValues={props.changedStyleValues}
                        saveToHistory={() => props.saveToHistory()}
                        changed={color => props.changed(color, 'background')}
                        withOnCheckbox
                        onOffChecked={props.boxesValues.backgroundOn}
                        onOffChanged={value => props.changed(value, 'backgroundOn')} />
                </ToolsBlock>
                <ToolsBlock blockType="one" >
                    <BigButtonDropDown
                        title="Border & Shadow"
                        icon='<svg height="30" viewBox="-467 269 24 24" width="30"><path d="M-464,272v18h18v-18H-464z M-448,288h-14v-14h14V288z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>'
                        dropDownType="boxBorder">
                        <BoxBorderMenu />
                    </BigButtonDropDown>
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButtonDropDown
                        title="Map"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path xmlns="http://www.w3.org/2000/svg" d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" ></path></svg>'
                        dropDownType="googleMap">
                        <GoogleMapMenu />
                    </SmallButtonDropDown>
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Position" >
                <ToolsBlock blockType="three" >
                    <ValueInput
                        title="Left"
                        startValue={props.boxesValues.left}
                        changed={value => props.changed(value, 'left')} />
                    <ValueInput
                        title="Top"
                        startValue={props.boxesValues.top}
                        changed={value => props.changed(value, 'top')} />
                </ToolsBlock>
                <ToolsBlock blockType="one">
                    <BigButtonDropDown
                        title="Align"
                        icon='<svg height="30" viewBox="-467 269 24 24" width="30"><path d="M-462,277v3h-4v2h4v3l4-4L-462,277z M-448,285v-3h4v-2h-4v-3l-4,4L-448,285z M-454,273h-2v16h2V273z"></path></svg>'
                        clicked="boxAlign">
                        <BoxAlignMenu />
                    </BigButtonDropDown>
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Size" >
                <ToolsBlock blockType="three" >
                    <ValueInput
                        title="Width"
                        min="5"
                        startValue={props.boxesValues.width}
                        changed={value => props.changed(value, 'width')} />
                    <ValueInput
                        title="Height"
                        min="5"
                        startValue={props.boxesValues.height}
                        changed={value => props.changed(value, 'height')} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Arrange" >
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Move up"
                        icon='<svg width="16px" height="16px" viewBox="-467 269 24 24"><path d="M-462.4,286.7l7.4-7.4l7.4,7.4l2.3-2.3l-9.7-9.7l-9.7,9.7L-462.4,286.7z"></path></svg>'
                        buttonClicked={() => props.moveUpBox()} />
                    <SmallButton
                        title="Move down"
                        icon='<svg width="16px" height="16px" viewBox="-467 269 24 24"><path d="M-447.6,274.7l-7.4,7.4l-7.4-7.4l-2.3,2.3l9.7,9.7l9.7-9.7L-447.6,274.7z"></path></svg>'
                        buttonClicked={() => props.moveDownBox()} />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Forward"
                        icon='<svg width="16px" height="16px" viewBox="-467 269 24 24"><path d="M-462.4,286.7l7.4-7.4l7.4,7.4l2.3-2.3l-9.7-9.7l-9.7,9.7L-462.4,286.7z"></path></svg>'
                        buttonClicked={() => props.zIndexUpBox()} />
                    <SmallButton
                        title="Backward"
                        icon='<svg width="16px" height="16px" viewBox="-467 269 24 24"><path d="M-447.6,274.7l-7.4,7.4l-7.4-7.4l-2.3,2.3l9.7,9.7l9.7-9.7L-447.6,274.7z"></path></svg>'
                        buttonClicked={() => props.zIndexDownBox()} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Move" >
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Copy"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.copyBox(props.builderPresentState, props.bufferState)} />
                    <SmallButton
                        title="Cut"
                        icon='<svg width="16" height="16" viewBox="0 0 24 24"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>'
                        buttonClicked={() => props.cutBox(props.builderPresentState, props.bufferState)} />
                    <SmallButton
                        title="Paste"
                        icon='<svg width="16" height="16" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"></path></svg>'
                        buttonClicked={() => props.pasteBox(props.builderPresentState, props.bufferState)} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Navigation" >
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Enter box"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>'
                        buttonClicked={() => props.enterBox()} />
                    <SmallButton
                        title="Exit box"
                        icon='<svg width="16" height="16" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></svg>'
                        buttonClicked={() => props.exitBox()} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="State" >
                <ToolsBlock blockType="three" >
                    <Checkbox
                        title="Hover"
                        checked={ props.chosenBoxes.length > 0
                            ? props.chosenBoxes[0] === props.hoveredElement ? true : false
                            : false }
                        onChange={(value) => props.setStateHover(value)} />
                    <Checkbox
                        title="Clicked"
                        checked={ props.chosenBoxes.length > 0
                            ? props.chosenBoxes[0] === props.activeElement ? true : false
                            : false }
                        onChange={(value) => props.setStateActive(value)} />
                </ToolsBlock>
            </ToolsSection>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        chosenBoxes: state.builder.present.chosenBoxes,
        hoveredElement: state.builder.present.hoveredElement,
        activeElement: state.builder.present.activeElement,
        boxesValues: state.builder.present.chosenBoxesValues,
        changedStyleValues: state.builder.present.changedStyleValues,
        builderPresentState: state.builder.present,
        bufferState: state.buffer

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBox: () => dispatch(actions.addBox()),
        duplicateBox: () => dispatch(actions.duplicateBox()),
        deleteBox: () => dispatch(actions.deleteBox()),
        moveUpBox: () => dispatch(actions.moveUpBox()),
        moveDownBox: () => dispatch(actions.moveDownBox()),
        zIndexUpBox: () => dispatch(actions.zIndexUpBox()),
        zIndexDownBox: () => dispatch(actions.zIndexDownBox()),
        copyBox: (builderPresentState, bufferState) => dispatch(actions.copyBox(builderPresentState, bufferState)),
        cutBox: (builderPresentState, bufferState) => dispatch(actions.cutBox(builderPresentState, bufferState)),
        pasteBox: (builderPresentState, bufferState) => dispatch(actions.pasteBox(builderPresentState, bufferState)),
        enterBox: () => dispatch(actions.enterBox()),
        exitBox: () => dispatch(actions.exitBox()),
        saveToHistory: () => { dispatch(actions.saveToHistory()) },
        setStateHover: value => { dispatch(actions.setStateHover(value)) },
        setStateActive: value => { dispatch(actions.setStateActive(value)) },
        changed: (value, valueKey) => dispatch(actions.changeElementPropertyValue(value, valueKey, false, true))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Boxes);