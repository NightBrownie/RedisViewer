import { routerActions } from 'react-router-redux'

import * as types from '../constants/actionTypes'
import * as routes from '../constants/routes'

export const requestServerList = () => ({
  type: types.SERVER_VIEW_REQUEST_SERVER_LIST
})

export const serverListRequested = () => ({
  type: types.SERVER_VIEW_SERVER_LIST_REQUESTED
})

export const serverListChanged = (servers) => ({
  type: types.SERVER_VIEW_SERVER_LIST_CHANGED,
  servers
})

export const requestAddServer = () => routerActions.push(routes.ADD_SERVER)

export const addServer = (server) => ({
  type: types.SERVER_VIEW_ADD_SERVER,
  server
})

export const serverSelected = (server) => ({
  type: types.SERVER_VIEW_SERVER_SELECTED,
  server
})

export const requestUpdateServer = () => ({
  type: types.SERVER_LIST_REQUEST_UPDATE_SERVER
})

export const updateServer = (id, server) => () => ({
  type: types.SERVER_VIEW_UPDATE_SERVER,
  id,
  server
})

export const serverChanged = (server) => ({
  type: types.SERVER_VIEW_SERVER_CHANGED,
  server
})
