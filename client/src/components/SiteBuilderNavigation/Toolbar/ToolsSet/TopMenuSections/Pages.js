import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';

import * as actions from '../../../../../store/actions/index';
import ToolsSection from '../ToolsSection/ToolsSection';
import ToolsBlock from '../ToolsSection/ToolsBlock/ToolsBlock';
import Aux from '../../../../../hoc/Aux';
import BigButton from '../../../../UI/Buttons/BigButton/BigButton';
import SmallButton from '../../../../UI/Buttons/SmallButton/SmallButton';
import BigButtonDropDown from '../../../../UI/Buttons/BigButtonDropDown/BigButtonDropDown';
import PageSettingsMenu from '../DropDownMenus/PageSettingsMenu/PageSettingsMenu';
import BigButtonWithCheckbox from '../../../../UI/Buttons/BigButtonWithCheckbox/BigButtonWithCheckbox';

const Sections = props =>  {
    return (
        <Aux>
            <ToolsSection
                label="Basic" >
                <ToolsBlock
                    blockType="one" >
                    <BigButton
                        title="Add"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>'
                        buttonClicked={() => props.addPage(props.websiteId, props.currentPageId)} />
                </ToolsBlock>
                <ToolsBlock
                    blockType="three" >
                    <SmallButton
                        title="Duplicate"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.duplicatePage(props.websiteId, props.currentPageId)} />
                    <SmallButton
                        title="Delete"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>'
                        buttonClicked={() => props.deletePage(props.currentPageId)} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Save" >
                <ToolsBlock blockType="one" >
                    <BigButton
                        title="Save"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>'
                        buttonClicked={() => props.savePage(
                            {content: props.currentPageState}, 
                            props.currentPageId)} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Settings" >
                <ToolsBlock blockType="one" >
                    <BigButtonDropDown
                        title="Meta Data"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"></path></svg>'
                        dropDownType="pageSettings">
                        <PageSettingsMenu />
                    </BigButtonDropDown>
                </ToolsBlock>
                <ToolsBlock blockType="one" >
                    <BigButtonWithCheckbox
                        title="Hidden"
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>'
                        clicked={() => props.savePage(
                            {isHidden: !props.isHidden},
                            props.currentPageId)}
                        checked={props.isHidden} />
                </ToolsBlock>
            </ToolsSection>
            <ToolsSection label="Versions" >
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Publish one page"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.publishPage(props.websiteId, props.currentPageId, true)} />
                    <SmallButton
                        title="Publish all pages"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.publishPage(props.websiteId, props.currentPageId)} />
                </ToolsBlock>
                <ToolsBlock blockType="three" >
                    <SmallButton
                        title="Revert one page to published"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.revertPage(props.websiteId, props.currentPageId, true)} />
                    <SmallButton
                        title="Revert all page to published"
                        icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'
                        buttonClicked={() => props.revertPage(props.websiteId, props.currentPageId)} />
                </ToolsBlock>
            </ToolsSection>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        currentPageId: state.website.currentPage,
        currentPageState: omit(state.builder.present, [
            'pageZoom',
            'alignMode',
            'saveHistory',
            'chosenBoxes',
            'chosenSection',
            'chosenBoxesValues',
            'chosenSectionValue',
            'chosenTextValues',
            'enteredBoxes',
            'hoveredElement',
            'activeElement',
            'changedStyleValues',
            'boxesDragStartValues',
            'preview'
        ]),
        websiteId: state.website._id,
        isHidden: state.website.currentPage ? state.website.pagesObjects[state.website.currentPage].isHidden : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        duplicatePage: (websiteId, currentPageId) => dispatch(actions.duplicatePage(websiteId, currentPageId)),
        deletePage: currentPageId => dispatch(actions.deletePage(currentPageId)),
        addPage: (websiteId, currentPageId) => dispatch(actions.addPage(websiteId, currentPageId)),
        savePage: (newValue, currentPageId) => dispatch(actions.savePage(newValue, currentPageId)),
        publishPage: (websiteId, currentPageId, publishOne) => dispatch(actions.publishPage(websiteId, currentPageId, publishOne)),
        revertPage: (websiteId, currentPageId, publishOne) => dispatch(actions.revertPage(websiteId, currentPageId, publishOne)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Sections);