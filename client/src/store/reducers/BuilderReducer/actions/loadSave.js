export const loadCurrentPageToBuilder = (state, action) => {
    return {
        pageZoom: 100,
        alignMode: 'parent',
        saveHistory: false,
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
        ...action.pagesObjects[action._id].content
    }
}