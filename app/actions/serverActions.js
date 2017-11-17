import * as types from '../constants/actionTypes/index'

/* Server list */
export const requestServerList = () => ({
  type: types.SERVER_REQUEST_SERVER_LIST
})

export const serverListRequested = () => ({
  type: types.SERVER_SERVER_LIST_REQUESTED
})

export const serverListChanged = (servers) => ({
  type: types.SERVER_SERVER_LIST_CHANGED,
  servers
})

/* Server toolbox */
export const requestEditServer = (server) => ({
  type: types.SERVER_EDIT_SERVER,
  server
})

export const requestRemoveServer = (server) => ({
  type: types.SERVER_REMOVE_SERVER,
  server
})

export const filterChanged = (filterTerm) => ({
  type: types.SERVER_FILTER_CHANGED,
  filterTerm,
  meta: {
    debounce: {
      time: 200
    }
  }
})

/* Server view */
export const serverSelected = (server) => ({
  type: types.SERVER_SERVER_SELECTED,
  server
})

export const keySelected = (server, key) => ({
  type: types.SERVER_KEY_SELECTED,
  server,
  key
})

export const toggleServerListItemExpand = (itemKey) => ({
  type: types.SERVER_TOGGLE_SERVER_LIST_ITEM_EXPAND,
  itemKey
})

export const openKey = (server, key) => ({
  type: types.SERVER_OPEN_KEY,
  server,
  key
})

export const requestKeys = (server) => ({
  type: types.SERVER_REQUEST_KEYS,
  server
})

export const keysLoaded = (server, keys) => ({
  type: types.SERVER_KEYS_LOADED,
  server,
  keys
})

export const keysLoadFailed = (server, error) => ({
  type: types.SERVER_KEYS_LOAD_FAILED,
  server,
  error
})

/* Server settings */
export const requestConnectionTest = (server) => ({
  type: types.SERVER_REQUEST_CONNECTION_TEST,
  server
})

export const setServer = (server) => ({
  type: types.SERVER_SET_SERVER,
  server
})

export const serverSaved = (server) => ({
  type: types.SERVER_SERVER_SAVED,
  server
})

export const serverRemoved = (server) => ({
  type: types.SERVER_SERVER_REMOVED,
  server
})
