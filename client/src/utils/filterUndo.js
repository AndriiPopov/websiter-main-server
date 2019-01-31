//const IGNORE_TIME = 200

//let filter = true
export default function undoFilter (action, currState, prevState) {
    if (action.isNotForHistory) {
        return false;
    }
    const excludeActions = [
        'CLICK_TOP_MENU_ITEM',
        'CHOOSE_BOX',
        'CHOOSE_SECTION',
        'CHANGE_ALIGN_MODE',
        'DESELECT_ELEMENTS',
        'DESELECT_INNER',
        'ENTER_BOX',
        'EXIT_BOX',
        'UNSET_STATE_HOVER_ACTIVE',
        'SET_STATE_ACTIVE',
        'SET_STATE_HOVER',
        'ADD_ELEMENTS_TO_BUFFER',
        'BUILDER_ZOOM_OUT',
        'BUILDER_ZOOM_IN',
        'BUILDER_ZOOM_RESET',
        'PREVIEW_PAGE',
        'UPDATE_TEXT_VALUES',
        'AUTH_START',
        'AUTH_SUCCESS',
        'AUTH_FAIL',
        'AUTH_LOGOUT',
        'SAVE_WEBSITE_DATA_FROM_SERVER',
        'ACTION_START',
        'ACTION_FAIL',
        'LOAD_WEBSITE',
        'CREATE_WEBSITE',
        'SAVE_WEBSITE_SETTINGS',
        'DELETE_SUCCESS',
        'DELETE_START',
        'SET_CURRENT_PAGE',
        'ADD_PAGE_SUCCESS',
        'DELETE_PAGE_SUCCESS',
        'ACTION_SUCCESS',
        'SAVE_PAGE_STRUCTURE_TO_STORE',
        'SAVE_PAGE_IN_STATE'
    ];
    if (excludeActions.includes(action.type)) {
        return false;
    }
  // other filters
  //filter = actionsThrottlingFilter(action)
    return true;
}

// Store rapid actions of the same type at most once every x time.
/*
let ignoreRapid = false
let prevActionType
function actionsThrottlingFilter (action) {
  if (action.type !== prevActionType) {
    ignoreRapid = false
    prevActionType = action.type
    return true
  }
  if (ignoreRapid) {
    return false
  }
  ignoreRapid = true
  setTimeout(() => {
    ignoreRapid = false
  }, IGNORE_TIME)
  return true
}
*/