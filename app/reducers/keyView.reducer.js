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
    case actionTypes.keyView.KEY_REQUEST_DATA:
      return {
        ...state,
        loadingKeyData: true
      }
    case actionTypes.keyView.KEY_DATA_RECEIVED:
      return {
        ...state,
        loadingKeyData: false,
        previousData: state.currentData ? state.currentData : action.data,
        currentData: action.data,
        lastUpdateTime: new Date()
      }
    case actionTypes.keyView.KEY_DATA_REQUEST_FAILED:
      return {
        ...state,
        loadingKeyData: false
      }
    case actionTypes.keyView.SERVER_OPEN_KEY:
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
    case actionTypes.keyView.KEY_SUBSCRIBE:
    case actionTypes.keyView.KEY_UNSUBSCRIBE:
      return {
        ...state,
        isUpdatesTrackToggling: true
      }
    case actionTypes.keyView.KEY_SUBSCRIBED:
      return {
        ...state,
        isUpdatesTrackToggling: false,
        isUpdatesTrackEnabled: true
      }
    case actionTypes.keyView.KEY_UNSUBSCRIBED:
      return {
        ...state,
        previousData: state.currentData,
        isUpdatesTrackToggling: false,
        isUpdatesTrackEnabled: false
      }
    case actionTypes.keyView.KEY_SUBSCRIPTION_FAILED:
    case actionTypes.keyView.KEY_UNSUBSCRIPTION_FAILED:
      return {
        ...state,
        isUpdatesTrackToggling: false
      }
    default:
      return state
  }
}
