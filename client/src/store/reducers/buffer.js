import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rootElements: [],
    currentId: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ELEMENTS_TO_BUFFER:
            return {
                ...action.items,
                rootElements: action.rootElements,
                currentId: 0
            };
        default:
            return state;      
    }
};

export default reducer;