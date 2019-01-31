import omit from 'object.omit';

import { updateChosenBoxesAndSectionValues, getElementsToAdd, getElementsToDelete } from '../utils';

export const addSection = state => {
    const newId = 'element_' + state.currentId;
    state.currentId = state.currentId + 1;
    const newSection = {
        type: 'section',
        height: 200,
        background: 'rgba(200, 100, 30)',
        header: false,
        footer: false,
        allPages: false,
        space: 50,
        children: [],
        styles: []
    };
    return updateChosenBoxesAndSectionValues({
        ...state,
        [newId]: newSection,
        chosenBoxes: [],
        chosenSection: newId,
        enteredBoxes: [],
        sectionsOnPage: state.sectionsOnPage.concat([newId])
    });
};

export const duplicateSection = state => {
    const firstLayerElements = [];
    const elementsToAdd = getElementsToAdd(state, [state.chosenSection], firstLayerElements);

    return updateChosenBoxesAndSectionValues({
        ...state,
        ...elementsToAdd,
        chosenBoxes: [],
        chosenSection: firstLayerElements[0],
        sectionsOnPage: state.sectionsOnPage.concat(firstLayerElements)
    });
};

export const deleteSection = state => {
    const elementsToRemove = getElementsToDelete([state.chosenSection], state);
    const newState = omit(state, elementsToRemove.concat(state[state.chosenSection]).styles);
    newState.sectionsOnPage = newState.sectionsOnPage
        .filter(el => el !== state.chosenSection);
    return updateChosenBoxesAndSectionValues({
        ...newState,
        chooseSection: null,
        chosenBoxes: [],
        enteredBoxes: []
    });
};