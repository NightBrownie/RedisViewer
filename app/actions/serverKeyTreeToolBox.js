import actionTypes from '../constants/actionTypes/serverKeyTreeToolBox'

export const requestAddServer = () => ({
  type: actionTypes.REQUEST_ADD_SERVER
})

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
  requestAddServer,
  requestEditServer,
  filterChanged
}
