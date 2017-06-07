import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  servers: [],
  itemsExpandedState: {},
  serverKeys: {}
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
    case actionTypes.SERVER_KEYS_LOADED:
      return {
        ...state,
        serverKeys: {
          ...state.serverKeys,
          [action.server.id]: action.keys
        }
      }
    default:
      return state
  }
}

export default serverListReducer
