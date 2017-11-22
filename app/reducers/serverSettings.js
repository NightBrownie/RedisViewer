import {LOCATION_CHANGE} from 'react-router-redux'

import serverActionTypes from '../constants/actionTypes/server'
import serverKeyTreeToolBoxActionTypes from '../constants/actionTypes/serverKeyTreeToolBox'

const defaultState = {
  shouldRedirectToTheRoot: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    // todo: try to replace with routing params
    case serverKeyTreeToolBoxActionTypes.REQUEST_EDIT_SERVER:
      return {
        ...state,
        initialServerSettings: action.server
      }

    case serverActionTypes.REMOVED:
      return {
        ...state,
        shouldRedirectToTheRoot: state.initialServerSettings &&
          (state.initialServerSettings.id === action.server.id)
      }
    case serverActionTypes.SAVED:
      return {
        ...state,
        shouldRedirectToTheRoot: true
      }

    case LOCATION_CHANGE:
      return {
        ...state,
        shouldRedirectToTheRoot: false
      }

    default:
      return state
  }
}
