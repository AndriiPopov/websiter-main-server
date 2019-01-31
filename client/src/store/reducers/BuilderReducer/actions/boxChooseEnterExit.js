import { updateChosenBoxesAndSectionValues } from '../utils'

export const chooseBox = (state, action) => {
    if (state.chosenBoxes.includes(action.item)) {
        return state;
    }

    let section = action.item;
    const curState = { ...state };
    while (curState[section].type !== 'section') {
        section = curState[section].parent;
    }
    const result = {
        ...state,
        chosenSection: section
    };
    if (!action.ctrl || state.chosenBoxes.length === 0) {
        result.chosenBoxes = [action.item];
    } else {
        let prevSection = state.chosenBoxes[0];
        const curState = { ...state };
        while (curState[prevSection].type !== 'section') {
            prevSection = curState[prevSection].parent;
        }
        if (prevSection !== section) {
            result.chosenBoxes = [action.item];
            result.chosenBoxesValues = { ...state[action.item] };
        } else {
            result.chosenBoxes = state.chosenBoxes.concat([action.item]);
        }
    }
    return updateChosenBoxesAndSectionValues(result);
};

export const enterBox = state => {
    return updateChosenBoxesAndSectionValues({
        ...state,
        enteredBoxes: [...state.enteredBoxes, state.chosenBoxes[0]],
        chosenBoxes: []
    });
};

export const exitBox = state => {
    let enteredBoxes = [];
    let chosenBoxes = [];
    if (state.enteredBoxes.length > 0) {
        let parent = state[state.enteredBoxes[0]].parent;
        if (state[parent].type === 'box') {
            enteredBoxes = [parent];
        }
        chosenBoxes = [state.enteredBoxes[0]];
    }
    const result = {
        ...state,
        enteredBoxes: enteredBoxes,
        chosenBoxes: chosenBoxes
    };
    return updateChosenBoxesAndSectionValues(result);
};