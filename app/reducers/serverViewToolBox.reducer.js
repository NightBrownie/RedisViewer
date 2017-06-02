import * as actionTypes from '../constants/actionTypes'

const serverViewToolBoxReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SERVER_VIEW_REQUEST_ADD_SERVER:
      return {
        ...state,
        addServerRequested: true
      }
    case actionTypes.REACT_ROUTER_LOCATION_CHANGE:
      return {
        ...state,
        addServerRequested: false
      }
    default:
      return state
  }
}

export default serverViewToolBoxReducer
