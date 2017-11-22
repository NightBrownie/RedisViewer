import actionTypes from '../constants/actionTypes/server'

export const save = (server) => ({
  type: actionTypes.SAVE,
  server
})

export const saved = (server) => ({
  type: actionTypes.SAVED,
  server
})

export const remove = (server) => ({
  type: actionTypes.REMOVE,
  server
})

export const removed = (server) => ({
  type: actionTypes.REMOVED,
  server
})

export const requestList = () => ({
  type: actionTypes.REQUEST_LIST
})

export const listRequested = () => ({
  type: actionTypes.LIST_REQUESTED
})

export const listChanged = (servers) => ({
  type: actionTypes.LIST_CHANGED,
  servers
})

export const requestConnectionTest = (server) => ({
  type: actionTypes.REQUEST_CONNECTION_TEST,
  server
})

export default {
  save,
  saved,

  remove,
  removed,

  requestList,
  listRequested,
  listChanged,

  requestConnectionTest
}
