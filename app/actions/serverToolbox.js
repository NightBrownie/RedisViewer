import actionTypes from '../constants/actionTypes/serverToolbox'

export const requestEditServer = (server) => ({
  type: actionTypes.REQUEST_EDIT_SERVER,
  server
})

export const filterChanged = (filterTerm) => ({
  type: actionTypes.FILTER_CHANGED,
  filterTerm,
  meta: {
    debounce: {
      time: 200
    }
  }
})

export default {
  requestEditServer,
  filterChanged
}
