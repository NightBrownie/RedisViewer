// @flow

import { LOCATION_CHANGE } from 'react-router-redux'

import serverActionTypes from '../constants/actionTypes/server'
import serverKeyTreeActionTypes from '../constants/actionTypes/serverKeyTree'
import keyActionTypes from '../constants/actionTypes/key'

const defaultState = {
  key: null,
  server: null,
  previousData: null,
  currentData: null,
  lastUpdateTime: null,
  loadingKeyData: false,
  isUpdatesAutoTrackEnabled: false,
  isUpdatesAutoTrackToggling: false
}

export default (
  state: {
    previousData: ?any,
    currentData: ?any,
    key: ?string,
    server: ?{ id: string },
    lastUpdateTime: ?Date,
    loadingKeyData: boolean,
    isUpdatesAutoTrackEnabled: boolean,
    isUpdatesAutoTrackToggling: boolean
  } = defaultState,
  action: any
) => {
  switch (action.type) {
    case keyActionTypes.REQUEST_DATA:
      return {
        ...state,
        loadingKeyData: true
      }
    case keyActionTypes.DATA_RECEIVED:
      return {
        ...state,
        loadingKeyData: false,
        previousData: state.currentData ? state.currentData : action.data,
        currentData: action.data,
        lastUpdateTime: new Date()
      }
    case keyActionTypes.DATA_REQUEST_FAILED:
      return {
        ...state,
        loadingKeyData: false
      }

    case keyActionTypes.SUBSCRIBE:
    case keyActionTypes.UNSUBSCRIBE:
      return {
        ...state,
        isUpdatesTrackToggling: true
      }
    case keyActionTypes.SUBSCRIBED:
      return {
        ...state,
        isUpdatesTrackToggling: false,
        isUpdatesTrackEnabled: true
      }
    case keyActionTypes.UNSUBSCRIBED:
      return {
        ...state,
        previousData: state.currentData,
        isUpdatesTrackToggling: false,
        isUpdatesTrackEnabled: false
      }
    case keyActionTypes.SUBSCRIPTION_FAILED:
    case keyActionTypes.UNSUBSCRIPTION_FAILED:
      return {
        ...state,
        isUpdatesTrackToggling: false
      }

    case serverKeyTreeActionTypes.OPEN_KEY:
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
    case serverActionTypes.REMOVED:
      return state.server && (state.server.id === action.server.id)
        ? {
          ...state,
          server: null,
          key: null,
          previousData: null,
          currentData: null,
          lastUpdateTime: null
        }
        : state

    default:
      return state
  }
}
