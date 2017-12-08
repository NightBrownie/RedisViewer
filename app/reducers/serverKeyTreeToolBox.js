import serverKeyTreeToolBoxActionTypes from '../constants/actionTypes/serverKeyTreeToolBox'

import {LOCATION_CHANGE} from 'react-router-redux'

const defaultState = {
  editServerRequested: false
}

const serverViewToolBoxReducer = (state = defaultState, action) => {
  switch (action.type) {
    case serverKeyTreeToolBoxActionTypes.FILTER_CHANGED:
      return {
        ...state,
        filterTerm: action.filterTerm
      }

    // TODO: remove this redirect and replace with history action dispatch
    case serverKeyTreeToolBoxActionTypes.REQUEST_ADD_SERVER:
      return {
        ...state,
        editServerRequested: true
      }
    case serverKeyTreeToolBoxActionTypes.REQUEST_EDIT_SERVER:
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
