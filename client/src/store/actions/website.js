import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as actions from './index';

export const saveWebsiteDataFromServer = data => {
    return {
        type: actionTypes.SAVE_WEBSITE_DATA_FROM_SERVER,
        data
    };
};

export const createWebsite = () => {
    return dispatch => {
        dispatch(actionStart());
        axios.post('http://localhost:4000/api/websites')
            .then(response => {
                dispatch(saveWebsiteDataFromServer(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const loadWebsite = _id => {
    return dispatch => {
        dispatch(actionStart());
        axios.get('http://localhost:4000/api/websites/' + _id)
            .then(response => {
                dispatch(saveWebsiteDataFromServer(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const saveWebsiteSettings = (_id, title, domain) => {
    return dispatch => {
        dispatch(actionStart());
        const websiteData = {
            title,
            domain
        };
        axios.put('http://localhost:4000/api/websites/' + _id,  JSON.stringify(websiteData))
            .then(response => {
                dispatch(saveWebsiteDataFromServer(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const deleteWebsite = _id => {
    return dispatch => {
        dispatch(actionStart());
        axios.delete('http://localhost:4000/api/websites/' + _id)
            .then(response => {
                dispatch(saveWebsiteDataFromServer(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const actionStart = () => {
    return {
        type: actionTypes.ACTION_START
    };
};

export const actionSuccess = () => {
    return {
        type: actionTypes.ACTION_SUCCESS
    };
};


export const actionFail = error => {
    return {
        type: actionTypes.ACTION_FAIL,
        error: error
    };
};


export const addPage = (websiteId, currentPageId) => { 
    return dispatch => {
        dispatch(actionStart());
        axios.post('http://localhost:4000/api/pages', JSON.stringify({
            websiteId,
            currentPageId
        }))
            .then(response => {
                dispatch(addPageSuccess(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const addPageSuccess = data => {
    return {
        type: actionTypes.ADD_PAGE_SUCCESS,
        page: data.page,
        pagesStructure: data.pagesStructure
    };
};

export const deletePage = currentPageId => { 
    return dispatch => {
        dispatch(actionStart());
        axios.delete('http://localhost:4000/api/pages/' + currentPageId)
            .then(response => {
                dispatch(deletePageSuccess(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const deletePageSuccess = data => {
    return {
        type: actionTypes.DELETE_PAGE_SUCCESS,
        pagesStructure: data.pagesStructure
    };
};

export const duplicatePage = (websiteId, currentPageId) => { 
    return dispatch => {
        dispatch(actionStart());
        axios.post('http://localhost:4000/api/pages', JSON.stringify({
            currentPageId,
            websiteId,
            duplicate: true
        }))
            .then(response => {
                dispatch(addPageSuccess(response.data));
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const savePagesStructure = (_id, pagesStructure) => { 
    return dispatch => {
        dispatch(actionStart());
        dispatch(savePagesStructureToStore(pagesStructure));
        axios.put('http://localhost:4000/api/websites/' + _id,  JSON.stringify({pagesStructure}))
            .then(response => {
                dispatch(actionSuccess());
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
};

export const savePagesStructureToStore = pagesStructure => {
    return {
        type: actionTypes.SAVE_PAGE_STRUCTURE_TO_STORE,
        pagesStructure
    }
}

export const setCurrentPageMain = (_id, pagesObjects) => {
    return dispatch => {
        dispatch(setCurrentPage(_id));
        dispatch(actions.loadCurrentPageToBuilder(_id, pagesObjects));
    }
}

export const setCurrentPage = (_id) => { return { type: actionTypes.SET_CURRENT_PAGE, _id } };

export const savePage = (value, currentPageId) => {
    return dispatch => {
        dispatch(actionStart());
        dispatch(savePageInState(value));
        axios.put('http://localhost:4000/api/pages/' + currentPageId,  JSON.stringify(value))
            .then(response => {
                dispatch(actionSuccess());
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
}

export const publishPage = (websiteId, currentPageId, publishOne) => {
    return dispatch => {
        dispatch(actionStart());
        axios.post('http://localhost:4000/api/pages/publish',  JSON.stringify({
            websiteId,
            currentPageId,
            publishOne
        }))
            .then(response => {
                dispatch(actionSuccess());
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
}

export const revertPage = (websiteId, currentPageId, publishOne) => {
    return dispatch => {
        dispatch(actionStart());
        axios.post('http://localhost:4000/api/pages/revert',  JSON.stringify({
            websiteId,
            currentPageId,
            publishOne
        }))
            .then(response => {
                dispatch(saveWebsiteDataFromServer(response.data));
                dispatch(actions.loadCurrentPageToBuilder(currentPageId, response.data.pagesObjects))
            })
            .catch(err => {
                dispatch(actionFail(err.response));
            }
        );
    }
}

const savePageInState = value => {
    return {
        type: actionTypes.SAVE_PAGE_IN_STATE,
        ...value
    }
}