export const updateTextValues = (state, action) => {
    return { 
        ...state,
        chosenTextValues: action.values
    };
};
