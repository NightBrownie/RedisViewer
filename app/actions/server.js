import * as actionTypes from '../constants/actionTypes/server'

/* Server list */
export const requestServerList = () => ({
  type: actionTypes.SERVER_REQUEST_SERVER_LIST
})

export const serverListRequested = () => ({
  type: actionTypes.SERVER_SERVER_LIST_REQUESTED
})

export const serverListChanged = (servers) => ({
  type: actionTypes.SERVER_SERVER_LIST_CHANGED,
  servers1q
})

/* Server toolbox */
export const requestEditServer = (server) => ({
  type: actionTypes.SERVER_EDIT_SERVER,
  server
})

export const requestRemoveServer = (server) => ({
  type: actionTypes.server.SERVER_REMOVE_SERVER,
  server
})

export const filterChanged = (filterTerm) => ({
  type: actionTypes.server.SERVER_FILTER_CHANGED,
  filterTerm,
  meta: {
    debounce: {
      time: 200
    }
  }
})

/* Server view */
export const serverSelected = (server) => ({
  type: actionTypes.server.SERVER_SERVER_SELECTED,
  server
})

export const keySelected = (server, key) => ({
  type: actionTypes.server.SERVER_KEY_SELECTED,
  server,
  key
})

export const toggleServerListItemExpand = (itemKey) => ({
  type: actionTypes.server.SERVER_TOGGLE_SERVER_LIST_ITEM_EXPAND,
  itemKey
})

export const openKey = (server, key) => ({
  type: actionTypes.server.SERVER_OPEN_KEY,
  server,
  key
})

/* Server settings */
export const requestConnectionTest = (server) => ({
  type: actionTypes.server.SERVER_REQUEST_CONNECTION_TEST,
  server
})

export const setServer = (server) => ({
  type: actionTypes.server.SERVER_SET_SERVER,
  server
})

export const serverSaved = (server) => ({
  type: actionTypes.server.SERVER_SERVER_SAVED,
  server
})

export const serverRemoved = (server) => ({
  type: actionTypes.server.SERVER_SERVER_REMOVED,
  server
})
