import * as actionTypes from '../constants/actionTypes'

export default function layoutReducer (state = {}, action) {
  switch (action.type) {
    // currently actions have the same semantics
    case actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED:
    case actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORED:
      return {
        ...state,
        serverViewWidth: action.width
      }
    default:
      return state
  }
};
