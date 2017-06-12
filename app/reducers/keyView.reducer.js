import {LOCATION_CHANGE} from 'react-router-redux'

import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  shouldRedirectToTheRoot: false,
  loadingKeyData: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.KEY_REQUEST_DATA:
      return {
        ...state,
        loadingKeyData: true
      }
    case actionTypes.KEY_DATA_RECEIVED:
      return {
        ...state,
        loadingKeyData: false,
        previousData: state.currentData ? state.currentData : action.data,
        currentData: action.data,
        lastUpdateTime: new Date()
      }
    case actionTypes.KEY_DATA_REQUEST_FAILED:
      return {
        ...state,
        loadingKeyData: false
      }
    case actionTypes.SERVER_OPEN_KEY:
      return {
        ...state,
        server: action.server,
        key: action.key,
        previousData: (state.server && state.server.id === action.server.id) && (state.key && state.key === action.key)
          ? state.previousData
          : null,
        currentData: (state.server && state.server.id === action.server.id) && (state.key && state.key === action.key)
          ? state.currentData
          : null,
        lastUpdateTime: (state.server && state.server.id === action.server.id) && (state.key && state.key === action.key)
          ? state.lastUpdateTime
          : null
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
