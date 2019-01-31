import * as actionTypes from './actionTypes';

export const setActiveTopMenuItem = item => {
    return {
        type: actionTypes.CLICK_TOP_MENU_ITEM,
        item
    };
};