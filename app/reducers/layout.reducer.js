import * as actionTypes from '../constants/actionTypes/index'

export default function layoutReducer (state = {}, action) {
  switch (action.type) {
    // currently actions have the same semantics
    case actionTypes.mainLayout.SERVER_KEY_TREE_VIEW_WIDTH_CHANGED:
    case actionTypes.mainLayout.SERVER_KEY_TREE_VIEW_WIDTH_RESTORED:
      return {
        ...state,
        serverViewWidth: action.width
      }
    default:
      return state
  }
};
