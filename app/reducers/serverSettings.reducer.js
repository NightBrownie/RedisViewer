import {LOCATION_CHANGE} from 'react-router-redux'

import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  shouldRedirectToTheRoot: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SERVER_EDIT_SERVER:
      return {
        ...state,
        initialServerSettings: action.server
      }
    case actionTypes.SERVER_SERVER_REMOVED:
      return {
        ...state,
        shouldRedirectToTheRoot: state.initialServerSettings &&
          (state.initialServerSettings.id === action.server.id)
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        shouldRedirectToTheRoot: false
      }
    case actionTypes.SERVER_SERVER_SAVED:
      return {
        ...state,
        shouldRedirectToTheRoot: true
      }
    default:
      return state
  }
}
