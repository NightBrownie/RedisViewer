import actionTypes from '../constants/actionTypes/serverKeyTree'

export const serverSelected = (server) => ({
  type: actionTypes.SERVER_SELECTED,
  server
})

export const keySelected = (server, key) => ({
  type: actionTypes.KEY_SELECTED,
  server,
  key
})

export const toggleItemExpand = (itemKey) => ({
  type: actionTypes.TOGGLE_ITEM_EXPAND,
  itemKey
})

export const openKey = (server, key) => ({
  type: actionTypes.OPEN_KEY,
  server,
  key
})

export default {
  serverSelected,
  keySelected,
  toggleItemExpand,
  openKey
}
