import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  servers: [],
  itemsExpandedState: {},
  serverKeys: {},
  loadingServerKeys: {}
}

const serverListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SERVER_SERVER_SELECTED:
      return {
        ...state,
        selectedServer: action.server
      }
    case actionTypes.SERVER_SERVER_REMOVED:
      return {
        ...state,
        selectedServer: null
      }
    case actionTypes.SERVER_SERVER_LIST_CHANGED:
      return {
        ...state,
        servers: action.servers
      }
    case actionTypes.SERVER_TOGGLE_SERVER_LIST_ITEM_EXPAND:
      return {
        ...state,
        itemsExpandedState: {
          ...state.itemsExpandedState,
          [action.itemKey]: !state.itemsExpandedState[action.itemKey]
        }
      }
    case actionTypes.SERVER_REQUEST_KEYS:
      return {
        ...state,
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: true
        }
      }
    case actionTypes.SERVER_KEYS_LOAD_FAILED:
      return {
        ...state,
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: false
        }
      }
    case actionTypes.SERVER_KEYS_LOADED:
      return {
        ...state,
        serverKeys: {
          ...state.serverKeys,
          [action.server.id]: action.keys
        },
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: false
        }
      }
    default:
      return state
  }
}

export default serverListReducer
