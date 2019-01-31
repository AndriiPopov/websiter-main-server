import { updateChosenBoxesAndSectionValues } from '../utils'

export const chooseSection = (state, action) => {
    return updateChosenBoxesAndSectionValues({
        ...state,
        chosenSection: action.item,
        chosenBoxes: [],
        chosenBoxesValues: {},
        enteredBoxes: []
    });
};