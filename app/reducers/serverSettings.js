// @flow

import {LOCATION_CHANGE} from 'react-router-redux'

import serverActionTypes from '../constants/actionTypes/server'
import serverKeyTreeToolBoxActionTypes from '../constants/actionTypes/serverKeyTreeToolBox'

const defaultState = {
  editingSettings: null,
  isEditMode: null,
  settingsSaved: null
}

export default (state: {
    editingSettings: ?any,
    isEditMode: ?boolean,
    settingsSaved: ?boolean
  } = defaultState,
  action: any
) => {
  switch (action.type) {
    // todo: try to replace with routing params
    case serverKeyTreeToolBoxActionTypes.REQUEST_EDIT_SERVER:
      return {
        ...state,
        isEditMode: true,
        editingSettings: action.server
      }
    // todo: try to replace with routing params
    case serverKeyTreeToolBoxActionTypes.REQUEST_ADD_SERVER:
      return {
        ...state,
        isEditMode: false
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
