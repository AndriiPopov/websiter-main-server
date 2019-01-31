import * as actionTypes from '../actions/actionTypes';

const initialState = {
    websites: [],
    title: null,
    header: {},
    footer: {},
    domain: null,
    bufferElements: [],
    pagesObjects: {},
    pagesStructure: [],
    _id: null,
    error: null,
    loading: false,
    pagesLoading: false,
    currentPage: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_WEBSITE_DATA_FROM_SERVER: return saveWebsiteDataFromServer(state, action);
        case actionTypes.ADD_PAGE_SUCCESS: return addPageSuccess(state, action);
        case actionTypes.DELETE_PAGE_SUCCESS: return deletePageSuccess(state, action);
        case actionTypes.SET_CURRENT_PAGE: return setCurrentPage(state, action);
        case actionTypes.SAVE_PAGE_STRUCTURE_TO_STORE: return savePagesStructureToStore(state, action);
        case actionTypes.SAVE_PAGE_IN_STATE: return savePageInState(state, action);

        case actionTypes.ACTION_START: return actionStart(state);
        case actionTypes.ACTION_FAIL: return actionFail(state, action)
        case actionTypes.ACTION_SUCCESS: return actionSuccess(state)
        default:
            return state;      
    }
};

const saveWebsiteDataFromServer = (state, action) => {
    let newState;
    if (!action.data.website && !action.data.pagesObjects) {
        newState = initialState;
    }

    return {
        ...state,
        websites: action.data.websites || state.websites,
        pagesObjects: action.data.pagesObjects || state.pagesObjects,
        ...action.data.website,
        error: null,
        loading: false,
        pagesLoading: false,
        ...newState
    };
};

const addPageSuccess = (state, action) => {
    return {
        ...state,
        pagesStructure: action.pagesStructure,
        pagesObjects: {
            ...state.pagesObjects,
            [action.page._id]: action.page
        },
        currentPage: action.page._id,
        error: null,
        loading: false,
        pagesLoading: false
    }
}

const deletePageSuccess = (state, action) => {
    const newPagesObjects = {...state.pagesObjects};
    for(let i in newPagesObjects) {
        const isDeleted = !action.pagesStructure.some( item => item.id.toString() === i.toString());
        if (isDeleted) {
            newPagesObjects[i] = null;
        }
    }
    return {
        ...state,
        pagesObjects: newPagesObjects,
        pagesStructure: action.pagesStructure,
        error: null,
        loading: false,
        pagesLoading: false
    }
}

const actionStart = state => {
    return {
        ...state,
        error: null,
        pagesLoading: true
    };
};

const actionSuccess = state => {
    return {
        ...state,
        error: null,
        pagesLoading: false
    };
};

const actionFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        pagesLoading: false
    };
};

const setCurrentPage = (state, action) => {
    return {
        ...state,
        currentPage: action._id
    }
}

const savePagesStructureToStore = (state, action) => {
    return {
        ...state,
        ...action
    }
}

const savePageInState = (state, action) => {
    return {
        ...state,
        pagesObjects: {
            ...state.pagesObjects,
            [state.currentPage]: { 
                ...state.pagesObjects[state.currentPage],
                ...action
            }
        }
    }
}

export default reducer;