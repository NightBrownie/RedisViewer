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

    default:
      return state
  }
}

export default serverViewToolBoxReducer
