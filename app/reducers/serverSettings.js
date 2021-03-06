// @flow

import serverActionTypes from '../constants/actionTypes/server'
import serverKeyTreeToolBoxActionTypes from '../constants/actionTypes/serverKeyTreeToolBox'

const defaultState = {
  editingSettings: null,
  settingsSaved: null
}

export default (state: {
    editingSettings: ?any,
    settingsSaved: ?boolean
  } = defaultState,
  action: any
) => {
  switch (action.type) {
    case serverKeyTreeToolBoxActionTypes.REQUEST_EDIT_SERVER:
      return {
        ...state,
        editingSettings: action.server
      }
    case serverKeyTreeToolBoxActionTypes.REQUEST_ADD_SERVER:
      return {
        ...state,
        editingSettings: null
      }
    case serverActionTypes.REMOVED:
      return state.initialServerSettings && (state.initialServerSettings.id === action.server.id)
      ? {
        ...state,
        editingSettings: null
      }
      : state
    case serverActionTypes.SAVED:
      return {
        ...state,
        settingsSaved: true
      }

    default:
      return state
  }
}
