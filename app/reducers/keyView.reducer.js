import {LOCATION_CHANGE} from 'react-router-redux'

import * as actionTypes from '../constants/actionTypes/index'

const defaultState = {
  shouldRedirectToTheRoot: false,
  loadingKeyData: false,
  isUpdatesAutoTrackEnabled: false,
  isUpdatesAutoTrackToggling: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.key.REQUEST_DATA:
      return {
        ...state,
        loadingKeyData: true
      }
    case actionTypes.key.DATA_RECEIVED:
      return {
        ...state,
        loadingKeyData: false,
        previousData: state.currentData ? state.currentData : action.data,
        currentData: action.data,
        lastUpdateTime: new Date()
      }
    case actionTypes.key.DATA_REQUEST_FAILED:
      return {
        ...state,
        loadingKeyData: false
      }
    case actionTypes.key.SERVER_OPEN_KEY:
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
    case actionTypes.server.SERVER_SERVER_REMOVED:
      return {
        ...state,
        shouldRedirectToTheRoot: state.server && (state.server.id === action.server.id)
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        shouldRedirectToTheRoot: false
      }
    case actionTypes.key.SUBSCRIBE:
    case actionTypes.key.UNSUBSCRIBE:
      return {
        ...state,
        isUpdatesTrackToggling: true
      }
    case actionTypes.key.SUBSCRIBED:
      return {
        ...state,
        isUpdatesTrackToggling: false,
        isUpdatesTrackEnabled: true
      }
    case actionTypes.key.UNSUBSCRIBED:
      return {
        ...state,
        previousData: state.currentData,
        isUpdatesTrackToggling: false,
        isUpdatesTrackEnabled: false
      }
    case actionTypes.key.SUBSCRIPTION_FAILED:
    case actionTypes.key.UNSUBSCRIPTION_FAILED:
      return {
        ...state,
        isUpdatesTrackToggling: false
      }
    default:
      return state
  }
}
