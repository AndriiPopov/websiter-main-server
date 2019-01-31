import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeTopMenuItem: 'sections'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLICK_TOP_MENU_ITEM:
            return {
                ...state,
                activeTopMenuItem: action.item
            };
        default:
            return state;      
    }
};

export default reducer;