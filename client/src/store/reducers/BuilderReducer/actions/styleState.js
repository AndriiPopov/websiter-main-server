import omit from 'object.omit';

import { updateChosenBoxesAndSectionValues } from '../utils';

export const setStateHover = (state, action) => {
    let element;
    if (action.isSection) {
        element = state.chosenSection;
    } else {
        if (state.chosenBoxes.length > 0) {
            element = state.chosenBoxes[0];
        }
    }
    return updateChosenBoxesAndSectionValues({
        ...state,
        hoveredElement: element ? (element === state.hoveredElement ? null : element) : null,
        activeElement: null
    });
};

export const setStateActive = (state, action) => {
    let element;
    if (action.isSection) {
        element = state.chosenSection;
    } else {
        if (state.chosenBoxes.length > 0) {
            element = state.chosenBoxes[0];
        }
    }
    return updateChosenBoxesAndSectionValues({
        ...state,
        hoveredElement: null,
        activeElement: element ? (element === state.activeElement ? null : element) : null
    });
};

export const unsetStateHoverActive = state => {
    return updateChosenBoxesAndSectionValues({
        ...state,
        hoveredElement: null,
        activeElement: null
    });
};

export const clearStyle = (state, action) => {
    const influencer = state.hoveredElement || state.activeElement;
    const type = state.hoveredElement ? 'hover' : 'active';
    let newState = { ...state };
    let path;

    if (action.isSection) {
        path = `${state.chosenSection}_${influencer}_${type}`;
        newState = {
            ...newState,
            [path]: {
                ...omit(newState[path], action.value)
            }
        }
    } else {
        newState.chosenBoxes.forEach(box => {
            path = `${box}_${influencer}_${type}`;
            newState = {
                ...newState,
                [path]: {
                    ...omit(newState[path], action.value)
                }
            }
        });
    }
    return updateChosenBoxesAndSectionValues(newState);
};