import mainLayoutActionTypes from '../constants/actionTypes/mainLayout'

export default function layoutReducer (state = {}, action) {
  switch (action.type) {
    // currently actions have the same semantics
    case mainLayoutActionTypes.SERVER_KEY_TREE_WIDTH_CHANGED:
    case mainLayoutActionTypes.SERVER_KEY_TREE_WIDTH_RESTORED:
      return {
        ...state,
        serverViewWidth: action.width
      }

    default:
      return state
  }
};
