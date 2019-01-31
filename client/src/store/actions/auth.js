import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as actions from './index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = data => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const deleteStart = () => {
    return {
        type: actionTypes.DELETE_START
    };
};

export const deleteSuccess = () => {
    return {
        type: actionTypes.DELETE_SUCCESS
    };
};

export const deleteUser = () => {
    
    return dispatch => {
        dispatch(deleteStart());
        axios.delete('http://localhost:4000/api/users')
            .then(response => {
                dispatch(logout());
                dispatch(deleteSuccess());
            })
            .catch(err => {
                dispatch(deleteSuccess());
            }
        );
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    axios.defaults.headers.common['X-Auth-Token'] = null;
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password
        };

        let url = 'http://localhost:4000/api/users';
        if (!isSignup) {
            url = 'http://localhost:4000/api/auth';
        }
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.put['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';

        axios.post(url, JSON.stringify(authData))
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data._id);
                dispatch(authSuccess(response.data));
                dispatch(actions.saveWebsiteDataFromServer(response.data));
            })
            .catch(err => {
                dispatch(authFail(err.response));
            }
        );
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.put['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        
        if (!token || !userId) {
            dispatch(logout());
        } else {
            axios.defaults.headers.common['X-Auth-Token'] = token;
            dispatch(authStart());
            axios.get('http://localhost:4000/api/users')
                .then(response => {
                    dispatch(authSuccess({
                        ...response.data,
                        _id: userId,
                        token
                    }));
                    dispatch(actions.saveWebsiteDataFromServer(response.data));
                })
                .catch(err => {
                    dispatch(authFail(err.response));
                }
            );
        }
    };
};
