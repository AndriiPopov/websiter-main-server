import omit from 'object.omit';

import { getElementsToDelete, getElementsToAdd, updateChosenBoxesAndSectionValues } from '../utils';


export const addBox = (state, action) => {

    const parent = state.enteredBoxes.length > 0 ? state.enteredBoxes[0] :
        state.chosenSection ? state.chosenSection : null;

    if (!parent) {
        return;
    }

    if (!action.items) {
        let newId;
        newId = 'element_' + state.currentId;
        state.currentId = state.currentId + 1;

        action.items = {
            [newId]: {
                type: 'box',
                height: 50,
                width: 50,
                left: 0,
                top: 0,
                children: [],
                styles: []
            }
        };
        action.rootElements = [newId];
    };

    action.rootElements.forEach((element, index) => {
        action.items[element].parent = parent;
        action.items[element].zIndex = state[parent].children.length + index;
    });
    return updateChosenBoxesAndSectionValues({
        ...state,
        [parent]: {
            ...state[parent],
            children: state[parent].children.concat(action.rootElements)
        },
        ...action.items,
        chosenBoxes: action.rootElements
    });
};

export const deleteBox = (state) => {
    const parent = state[state.chosenBoxes[0]].parent;
    const elementsToRemove = getElementsToDelete(state.chosenBoxes, state);
    const newState = omit(state, elementsToRemove.concat(state[state.chosenSection]).styles);
    newState[parent].children = newState[parent].children.filter(el => {
        return el !== state.chosenBoxes[0];
    });
    const childrenForSort = [...newState[parent].children];
    childrenForSort.sort((a, b) => {
        return state[a].zIndex > state[b].zIndex;
    });
    childrenForSort.forEach((el, index) => newState[el].zIndex = index);
    return updateChosenBoxesAndSectionValues({
        ...newState,
        chosenBoxes: []
    });
};



export const duplicateBox = (state) => {
    const parent = state[state.chosenBoxes[0]].parent;
    const firstLayerElements = [];
    const elementsToAdd = getElementsToAdd(state, state.chosenBoxes, firstLayerElements);
    const newState = {
        ...state,
        ...elementsToAdd,
        chosenBoxes: firstLayerElements,
        [parent]: {
            ...state[parent],
            children: state[parent].children.concat(firstLayerElements)
        }
    };
    firstLayerElements.forEach(newEl => {
        newState[parent].children.forEach(el => {
            if (newState[el].zIndex > newState[newEl].zIndex) {
                newState[el].zIndex = newState[el].zIndex + 1;
            }
        });
        newState[newEl].zIndex = newState[newEl].zIndex + 1;
    });
    return updateChosenBoxesAndSectionValues(newState);
};