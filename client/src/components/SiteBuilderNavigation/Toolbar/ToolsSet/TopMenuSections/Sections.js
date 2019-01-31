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
import SmallButtonDropDown from '../../../../UI/Buttons/SmallButtonDropDown/SmallButtonDropDown';
import GoogleMapMenu from '../DropDownMenus/GoogleMapMenu/GoogleMapMenu';

const Sections = props =>  {
    return (
        <Aux>
            <ToolsSection
                label="Basic" >
                <ToolsBlock
                    blockType="one" >
                    <BigButton isSection
                        title="Add"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>'
                        buttonClicked={() => props.addSection()} />
                </ToolsBlock>
                <ToolsBlock
                    blockType="three" >
                    <SmallButton isSection
                        title="Duplicate"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.duplicateSection()} />
                    <SmallButton isSection
                        title="Delete"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>'
                        buttonClicked={() => props.deleteSection()} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Style" >
                <ToolsBlock blockType="one" >
                <BigColorPicker isSection
                        title="Background"
                        color="rgba(30, 250, 100, 1)"
                        sectionValues={props.boxesValues}
                        changedStyleValues={props.changedStyleValues}
                        saveToHistory={() => props.saveToHistory()}
                        changed={color => props.changed(color, 'background')}
                        withOnCheckbox
                        onOffChecked={props.sectionValues.backgroundOn}
                        onOffChanged={value => props.changed(value, 'backgroundOn')} />
                </ToolsBlock>
                <ToolsBlock blockType="one" >
                    <BigColorPicker isSection
                        title="Background"
                        color="rgba(30, 250, 100, 1)"
                        sectionValues={props.boxesValues}
                        changedStyleValues={props.changedStyleValues}
                        saveToHistory={() => props.saveToHistory()}
                        changed={color => props.changed(color, 'outerBackground')}
                        withOnCheckbox
                        onOffChecked={props.sectionValues.outerBackgroundOn}
                        onOffChanged={value => props.changed(value, 'outerBackgroundOn')} />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButtonDropDown isSection
                        title="Map"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path xmlns="http://www.w3.org/2000/svg" d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" ></path></svg>'
                        dropDownType="googleMap">
                        <GoogleMapMenu isSection />
                    </SmallButtonDropDown>
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Size" >
                <ToolsBlock blockType="three" >
                    <ValueInput isSection
                        title="Height"
                        min="0"
                        startValue={props.sectionValues.height}
                        changed={value => props.changed(value, 'height', true)} />
                    <ValueInput isSection
                        title="Space"
                        min="0"
                        startValue={props.sectionValues.space}
                        changed={value => props.changed(value, 'space', true)} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Arrange" >
                <ToolsBlock blockType="three" >
                    <SmallButton isSection
                        title="Move up"
                        icon='<svg width="16px" height="16px" viewBox="-467 269 24 24"><path d="M-462.4,286.7l7.4-7.4l7.4,7.4l2.3-2.3l-9.7-9.7l-9.7,9.7L-462.4,286.7z"></path></svg>'
                        buttonClicked={() => props.moveUpSection()} />
                    <SmallButton isSection
                        title="Move down"
                        icon='<svg width="16px" height="16px" viewBox="-467 269 24 24"><path d="M-447.6,274.7l-7.4,7.4l-7.4-7.4l-2.3,2.3l9.7,9.7l9.7-9.7L-447.6,274.7z"></path></svg>'
                        buttonClicked={() => props.moveDownSection()} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="State" >
                <ToolsBlock blockType="three" >
                    <Checkbox isSection
                        title="Hover"
                        checked={ props.chosenSection
                            ? props.chosenSection === props.hoveredElement ? true : false
                            : false }
                        onChange={(value) => props.setStateHover(value)} />
                    <Checkbox isSection
                        title="Clicked"
                        checked={ props.chosenSection
                            ? props.chosenSection === props.activeElement ? true : false
                            : false }
                        onChange={(value) => props.setStateActive(value)} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Move" >
                <ToolsBlock blockType="one" >
                    <BigButton
                        title="Paste"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.pasteBox()} />
                </ToolsBlock>
            </ToolsSection>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        chosenSection: state.builder.present.chosenSection,
        hoveredElement: state.builder.present.hoveredElement,
        activeElement: state.builder.present.activeElement,
        sectionValues: state.builder.present[state.builder.present.chosenSection] || {},
        changedStyleValues: state.builder.present.changedStyleValues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSection: () => dispatch(actions.addSection()),
        duplicateSection: () => dispatch(actions.duplicateSection()),
        deleteSection: () => dispatch(actions.deleteSection()),
        moveUpSection: () => dispatch(actions.moveUpSection()),
        moveDownSection: () => dispatch(actions.moveDownSection()),
        saveToHistory: () => { dispatch(actions.saveToHistory()) },
        setStateHover: value => { dispatch(actions.setStateHover(value)) },
        setStateActive: value => { dispatch(actions.setStateActive(value)) },
        changed: (value, valueKey) => dispatch(actions.changeElementPropertyValue(value, valueKey, true, true))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sections);