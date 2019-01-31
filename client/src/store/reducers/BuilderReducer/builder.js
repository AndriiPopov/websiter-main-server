import undoable from 'redux-undo'

import * as actionTypes from '../../actions/actionTypes';
import undoFilter from '../../../utils/filterUndo';
import * as sectionChoose from './actions/sectionChoose';
import * as sectionAddDelDuplicate from './actions/sectionAddDelDuplicate';
import * as sectionOrder from './actions/sectionOrder';
import * as boxAlign from './actions/boxAlign';
import * as boxAddDelDuplicate from './actions/boxAddDelDuplicate';
import * as viewSettings from './actions/viewSettings';
import * as styleState from './actions/styleState';
import * as boxIndexOrder from './actions/boxIndexOrder';
import * as boxChooseEnterExit from './actions/boxChooseEnterExit';
import * as loadSave from './actions/loadSave';
import * as text from './actions/text';
import { changeElementPropertyValue, deselectElements, deselectInner } from './utils';

const initialState = {
    pageZoom: 100,
    alignMode: 'parent',
    saveHistory: false,
    sectionsOnPage: ['element_0', 'element_4'],
    chosenBoxes: [],
    chosenSection: null,
    chosenBoxesValues: {},
    chosenSectionValue: {},
    chosenTextValues: {},
    enteredBoxes: [],
    hoveredElement: null,
    activeElement: null,
    changedStyleValues: [],
    boxesDragStartValues: [],
    preview: false,
    currentId: 6,
    element_0: {
        type: 'section',
        height: 200,
        space: 50,
        background: 'rgba(200, 100, 30)',
        header: false,
        footer: false,
        allPages: false,
        children: ['element_3', 'element_1'],
        styles: []
    },
    element_1: {
        type: 'box',
        height: 100,
        width: 100,
        left: 200,
        top: 100,
        background: 'rgba(100, 0, 80)',
        zIndex: 0,
        children: ['element_2'],
        parent: 'element_0',
        styles: ['element_1_element_0_hover']
    },
    element_2: {
        type: 'box',
        height: 50,
        width: 50,
        left: 100,
        top: 200,
        background: 'rgba(10, 200, 90)',
        zIndex: 0,
        children: [],
        parent: 'element_1',
        styles: []
    },
    element_3: {
        type: 'box',
        height: 50,
        width: 50,
        left: 200,
        top: 200,
        background: 'rgba(170, 100, 200)',
        zIndex: 1,
        children: [],
        parent: 'element_0',
        styles: []
    },
    element_1_element_0_hover: {
        type: 'hover',
        influencer: 'element_0',
        left: 0,
        top: 0
    },
    element_4: {
        type: 'section',
        height: 500,
        space: 50,
        background: 'rgba(200, 100, 30)',
        backgroundOn: true,
        header: false,
        footer: false,
        allPages: false,
        children: ['element_5'],
        styles: []
    },
    element_5: {
        type: 'text',
        height: 400,
        width: 400,
        left: 500,
        top: 40,
        background: 'rgba(170, 100, 200)',
        backgroundOn: true,
        zIndex: 1,
        children: [],
        parent: 'element_4',
        styles: [],
        textContent: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"A line of tsdfdsfsdfdsds;lkfsd;kfsd;lfk.","marks":[]}]}]}]}}'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DESELECT_ELEMENTS:             return deselectElements(state);
        case actionTypes.DESELECT_INNER:                return deselectInner(state, action);
        case actionTypes.CHANGE_ELEMENT_PROPERTY_VALUE: return changeElementPropertyValue(state, action);
        
        case actionTypes.CHOOSE_SECTION: return sectionChoose.chooseSection(state, action);

        case actionTypes.ADD_SECTION:       return sectionAddDelDuplicate.addSection(state);
        case actionTypes.DUPLICATE_SECTION: return sectionAddDelDuplicate.duplicateSection(state);
        case actionTypes.DELETE_SECTION:    return sectionAddDelDuplicate.deleteSection(state);

        case actionTypes.MOVE_UP_SECTION:   return sectionOrder.moveUpSection(state);
        case actionTypes.MOVE_DOWN_SECTION: return sectionOrder.moveDownSection(state);

        case actionTypes.ADD_BOX:       return boxAddDelDuplicate.addBox(state, action);
        case actionTypes.DELETE_BOX:    return boxAddDelDuplicate.deleteBox(state);
        case actionTypes.DUPLICATE_BOX: return boxAddDelDuplicate.duplicateBox(state);

        case actionTypes.MOVE_UP_BOX:     return boxIndexOrder.moveUpBox(state);
        case actionTypes.MOVE_DOWN_BOX:   return boxIndexOrder.moveDownBox(state);
        case actionTypes.ZINDEX_UP_BOX:   return boxIndexOrder.zIndexUpBox(state);
        case actionTypes.ZINDEX_DOWN_BOX: return boxIndexOrder.zIndexDownBox(state);

        case actionTypes.ALIGN_BOXES:       return boxAlign.alignBoxes(state, action);
        case actionTypes.CHANGE_ALIGN_MODE: return boxAlign.changeAlignMode(state, action);

        case actionTypes.CHOOSE_BOX: return boxChooseEnterExit.chooseBox(state, action);
        case actionTypes.ENTER_BOX:  return boxChooseEnterExit.enterBox(state);
        case actionTypes.EXIT_BOX:   return boxChooseEnterExit.exitBox(state);

        case actionTypes.SET_STATE_HOVER:          return styleState.setStateHover(state, action);
        case actionTypes.SET_STATE_ACTIVE:         return styleState.setStateActive(state, action);
        case actionTypes.UNSET_STATE_HOVER_ACTIVE: return styleState.unsetStateHoverActive(state);
        case actionTypes.CLEAR_STYLE:              return styleState.clearStyle(state, action);

        case actionTypes.BUILDER_ZOOM_OUT:   return viewSettings.builderZoomOut(state);
        case actionTypes.BUILDER_ZOOM_IN:    return viewSettings.builderZoomIn(state);
        case actionTypes.BUILDER_ZOOM_RESET: return viewSettings.builderZoomReset(state);
        case actionTypes.PREVIEW_PAGE:       return viewSettings.pagePreview(state);

        case actionTypes.UPDATE_TEXT_VALUES: return text.updateTextValues(state, action);

        case actionTypes.LOAD_CURRENT_PAGE_TO_BUILDER: return loadSave.loadCurrentPageToBuilder(state, action);

        default: return state;
    }
};

const undoableReducer = undoable(reducer, {
    filter: undoFilter,
    limit: 8
});

export default undoableReducer;