import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  servers: []
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
    default:
      return state
  }
}

export default serverListReducer
