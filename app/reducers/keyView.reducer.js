import {LOCATION_CHANGE} from 'react-router-redux'

import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  shouldRedirectToTheRoot: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SERVER_OPEN_KEY:
      return {
        ...state,
        server: action.server,
        key: action.key
      }
    case actionTypes.SERVER_SERVER_REMOVED:
      return {
        ...state,
        shouldRedirectToTheRoot: state.server && (state.server.id === action.server.id)
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        shouldRedirectToTheRoot: false
      }
    default:
      return state
  }
}
