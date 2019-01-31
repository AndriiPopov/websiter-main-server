import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: false
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.data.token,
                userId: action.data._id,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: null,
                userId: null,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case actionTypes.DELETE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DELETE_SUCCESS:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;