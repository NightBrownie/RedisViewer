import * as actionTypes from '../constants/actionTypes'

import {LOCATION_CHANGE} from 'react-router-redux'

const defaultState = {
  editServerRequested: false
}

const serverViewToolBoxReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SERVER_EDIT_SERVER:
      return {
        ...state,
        editServerRequested: true
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        editServerRequested: false
      }
    default:
      return state
  }
}

export default serverViewToolBoxReducer
