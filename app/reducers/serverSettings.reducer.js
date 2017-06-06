import {LOCATION_CHANGE} from 'react-router-redux'

import * as actionTypes from '../constants/actionTypes'

const defaultState = {
  serverSuccessfullySaved: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        serverSuccessfullySaved: false
      }
    case actionTypes.SERVER_SERVER_SAVED:
      return {
        ...state,
        serverSuccessfullySaved: true
      }
    default:
      return state
  }
}
