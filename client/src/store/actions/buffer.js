import * as actionTypes from './actionTypes';

export const addElementsToBuffer = (rootElements, items) => {
    return {
        type: actionTypes.ADD_ELEMENTS_TO_BUFFER,
        rootElements,
        items
    };
};