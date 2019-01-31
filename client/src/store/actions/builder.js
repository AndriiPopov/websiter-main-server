import * as actionTypes from './actionTypes';
import * as actions from './index';
import { getElementsToAdd } from '../reducers/BuilderReducer/utils';

export const chooseBox = (item, ctrl) => {
    return dispatch => {
        dispatch(chooseBoxDo(item, ctrl));
        dispatch(actions.setActiveTopMenuItem('boxes'));
    };
};

export const chooseBoxDo = (item, ctrl) => {
    return {
        type: actionTypes.CHOOSE_BOX,
        item,
        ctrl
    };
};

export const chooseSection = (item, event) => {
    event.stopPropagation();
    return dispatch => {
        dispatch(chooseSectionDo(item));
        dispatch(actions.setActiveTopMenuItem('sections'));
    };
};

export const chooseSectionDo = item => {
    return {
        type: actionTypes.CHOOSE_SECTION,
        item
    };
};

export const deselectElements = () => { return { type: actionTypes.DESELECT_ELEMENTS } };
export const deselectInner = (e, item) => { e.stopPropagation(); return { type: actionTypes.DESELECT_INNER, item } };

export const changeElementPropertyValue = (value, key, isSection, isNotForHistory, items) => {
    return {
        type: actionTypes.CHANGE_ELEMENT_PROPERTY_VALUE,
        value,
        key,
        items,
        isSection,
        isNotForHistory
    };
};

export const bold = () => { return { type: actionTypes.DELETE_SECTION } };

export const deleteSection = () => { return { type: actionTypes.DELETE_SECTION } };
export const addSection = () => { return { type: actionTypes.ADD_SECTION } };
export const duplicateSection = () => { return { type: actionTypes.DUPLICATE_SECTION } };
export const moveUpSection = () => { return { type: actionTypes.MOVE_UP_SECTION } };
export const moveDownSection = () => { return { type: actionTypes.MOVE_DOWN_SECTION } };

export const deleteBox = () => { return { type: actionTypes.DELETE_BOX } };
export const addBox = (rootElements, items) => { return { type: actionTypes.ADD_BOX, rootElements, items } };
export const duplicateBox = () => { return { type: actionTypes.DUPLICATE_BOX } };
export const moveUpBox = () => { return { type: actionTypes.MOVE_UP_BOX } };
export const moveDownBox = () => { return { type: actionTypes.MOVE_DOWN_BOX } };
export const zIndexUpBox = () => { return { type: actionTypes.ZINDEX_UP_BOX } };
export const zIndexDownBox = () => { return { type: actionTypes.ZINDEX_DOWN_BOX } };

export const copyBox = (builderPresentState, bufferState) => {
    return dispatch => { 
        const firstLayerElements = [];
        const elementsToAdd = getElementsToAdd(builderPresentState, builderPresentState.chosenBoxes, firstLayerElements, null, null, null, bufferState);
        dispatch(actions.addElementsToBuffer(firstLayerElements, elementsToAdd));
    } 
};

export const cutBox = (builderPresentState, bufferState) => {
    return dispatch => { 
        const firstLayerElements = [];
        const elementsToAdd = getElementsToAdd(builderPresentState, builderPresentState.chosenBoxes, firstLayerElements, null, null, null, bufferState);
        dispatch(actions.addElementsToBuffer(firstLayerElements, elementsToAdd));
        dispatch(deleteBox());
    } 
};

export const pasteBox = (builderPresentState, bufferState) => {
    return dispatch => { 
        const firstLayerElements = [];
        const elementsToAdd = getElementsToAdd(bufferState, bufferState.rootElements, firstLayerElements, null, null, null, builderPresentState);
        dispatch(addBox(firstLayerElements, elementsToAdd));
    } 
};

export const enterBox = () => { return { type: actionTypes.ENTER_BOX } };
export const exitBox = () => { return { type: actionTypes.EXIT_BOX } };

export const clearStyle = (value, isSection) => { 
    return { 
        type: actionTypes.CLEAR_STYLE,
        isSection,
        value
    } 
};


export const changeAlignMode = value => {
    return {
        type: actionTypes.CHANGE_ALIGN_MODE,
        value
    };
};

export const alignBoxes = alignType => { 
    return { 
        type: actionTypes.ALIGN_BOXES,
        alignType
    } 
};

export const setStateHover = (isSection) => { return { type: actionTypes.SET_STATE_HOVER, isSection } };
export const setStateActive = (isSection) => { return { type: actionTypes.SET_STATE_ACTIVE, isSection } };
export const unsetStateHoverActive = () => { return { type: actionTypes.UNSET_STATE_HOVER_ACTIVE } };

export const builderZoomOut = () => { return { type: actionTypes.BUILDER_ZOOM_OUT } };
export const builderZoomIn = () => { return { type: actionTypes.BUILDER_ZOOM_IN } };
export const builderZoomReset = () => { return { type: actionTypes.BUILDER_ZOOM_RESET } };


export const saveToHistory = () => { return { type: actionTypes.SAVE_TO_HISTORY } };

export const previewPage = () => { return { type: actionTypes.PREVIEW_PAGE} };

export const updateTextValues = values => { return { type: actionTypes.UPDATE_TEXT_VALUES, values } };

export const loadCurrentPageToBuilder = (_id, pagesObjects) => { 
    return {
        type: actionTypes.LOAD_CURRENT_PAGE_TO_BUILDER,
        _id,
        pagesObjects
    }
 }