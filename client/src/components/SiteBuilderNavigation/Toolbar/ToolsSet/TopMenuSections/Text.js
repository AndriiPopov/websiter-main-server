import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions/index';
import ToolsSection from '../ToolsSection/ToolsSection';
import ToolsBlock from '../ToolsSection/ToolsBlock/ToolsBlock';
import Aux from '../../../../../hoc/Aux';
import SmallButtonTextEditor from '../../../../UI/TextUI/SmallButtonTextEditor/SmallButtonTextEditor';
import ValueInputTextEditor from '../../../../UI/TextUI/ValueInputTextEditor/ValueInputTextEditor';
import SmallColorPickerTextEditor from '../../../../UI/TextUI/SmallColorPickerTextEditor/SmallColorPickerTextEditor';
import SelectTextEditor from '../../../../UI/TextUI/SelectTextEditor/SelectTextEditor';
import { fontsList } from '../../../../../containers/SiteBuilder/fontsList';

const Text = props => {
    const fontWeightOptions = [
        {value: '100', label: 'Hairline'},
        {value: '200', label: 'Ultra Light'},
        {value: '300', label: 'Light'},
        {value: '400', label: 'Normal'},
        {value: '500', label: 'Medium'},
        {value: '600', label: 'Semi Bold'},
        {value: '700', label: 'Bold'},
        {value: '800', label: 'Ultra Bold'},
        {value: '900', label: 'Heavy'}
    ];

    const fontFamilyOptions = fontsList.map( font => 
        { return {value: font.font, label: font.font }} );
    
    const fontTextTransformOptions = [
        {value: 'none', label: 'None'},
        {value: 'uppercase', label: 'Uppercase'},
        {value: 'lowercase', label: 'Lowercase'},
        {value: 'capitalize', label: 'Capitalize'}
    ];

    const fontStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontFamily: data.value
            };
        },
        singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontFamily: data.value
            };
        }
    };

    const weightStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontWeight: data.value
            };
        },
        singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontWeight: data.value
            };
        }
    };

    return (
        <Aux>
            <ToolsSection label="Basic">
                <ToolsBlock blockType="three" >
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Italic"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="italic"
                        clicked="doChange" />
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Strikethrough"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="strikethrough"
                        clicked="doChange" />
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Underline"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="underline"
                        clicked="doChange" />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Supperscript"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="sup"
                        clicked="doChange" />
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Subscript"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="sub"
                        clicked="doChange" />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Size"
                        min="0"
                        max="500"
                        property="fontSize"
                        changed="doChangeInlineStyle" />
                    <SmallColorPickerTextEditor
                        textEditor={props.textEditor}
                        title="Color"
                        property="color"
                        changed="doChangeInlineStyle"
                        color="rgba(30, 250, 100, 1)" />
                    <SmallColorPickerTextEditor
                        textEditor={props.textEditor}
                        title="Highlight"
                        property="backgroundColor"
                        changed="doChangeInlineStyle"
                        color="rgba(30, 250, 100, 1)" />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SelectTextEditor
                        textEditor={props.textEditor}
                        title="Thickness"
                        property="fontWeight"
                        default="4"
                        changed="doChangeInlineStyle"
                        isSearchable={false}
                        options={fontWeightOptions}
                        styles={weightStyles} />
                    <SelectTextEditor
                        textEditor={props.textEditor}
                        title="Font family"
                        property="fontFamily"
                        default="0"
                        changed="doChangeInlineStyle"
                        isSearchable={true}
                        options={fontFamilyOptions}
                        styles={fontStyles} />
                </ToolsBlock>
                <ToolsBlock>
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Word spacing"
                        step="0.25"
                        property="wordSpacing"
                        changed="doChangeInlineStyle" />
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Letter spacing"
                        step="0.25"
                        property="letterSpacing"
                        changed="doChangeInlineStyle" />
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Line height"
                        step="1"
                        property="lineHeight"
                        changed="doChangeInlineStyle" />
                </ToolsBlock>
                <ToolsBlock>
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Top spacing"
                        step="1"
                        property="topSpacing"
                        changed="doChangeBlockStyle" />
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Bottom spacing"
                        step="1"
                        property="bottomSpacing"
                        changed="doChangeBlockStyle" />
                    <ValueInputTextEditor
                        textEditor={props.textEditor}
                        title="Text indent"
                        step="1"
                        property="textIndent"
                        changed="doChangeBlockStyle" />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Align left"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="textAlign"
                        value="left"
                        clicked="doChangeBlockStyle" />
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Align center"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="textAlign"
                        value="center"
                        clicked="doChangeBlockStyle" />
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Align right"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="textAlign"
                        value="right"
                        clicked="doChangeBlockStyle" />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButtonTextEditor
                        textEditor={props.textEditor}
                        title="Justify"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        property="textAlign"
                        value="justify"
                        clicked="doChangeBlockStyle" />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SelectTextEditor
                        textEditor={props.textEditor}
                        title="Transform"
                        property="textTransform"
                        default="0"
                        changed="doChangeInlineStyle"
                        isSearchable={false}
                        options={fontTextTransformOptions} />
                </ToolsBlock>
            </ToolsSection>
        </Aux>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        buttonClicked: () => dispatch(actions.addSection()),
        pasteBox: () => dispatch(actions.pasteBox())
    }
};

export default connect(null, mapDispatchToProps)(Text);