import { routerActions } from 'react-router-redux'

import * as types from '../constants/actionTypes'
import * as routes from '../constants/routes'

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

/* Edit server */
export const requestEditServer = (server) => ({
  type: types.SERVER_REQUEST_EDIT_SERVER,
  server
})

export const requestUpdateServer = () => ({
  type: types.SERVER_REQUEST_UPDATE_SERVER
})

export const requestConnectionTest = () => {}

export const setServer = (server) => ({
  type: types.SERVER_SET_SERVER,
  server
})

export const serverChanged = (server) => ({
  type: types.SERVER_SERVER_SAVED,
  server
})

export const serverSelected = (server) => ({
  type: types.SERVER_SERVER_SELECTED,
  server
})
