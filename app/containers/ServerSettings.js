import React from 'react'
import {connect} from 'react-redux'
import { routerActions } from 'react-router-redux'

import serverActions from '../actions/server'
import routes from '../constants/routes'

import ServerSettings from '../components/ServerSettings'

export default connect(
  state => ({
    shouldRedirectToTheRoot: state.serverSettings.shouldRedirectToTheRoot,
    editingSettings: state.serverSettings.editingSettings,
    settingsSaved: state.serverSettings.settingsSaved,
    isEditMode: state.serverSettings.isEditMode
  }),
  dispatch => ({
    saveServer: (server) => dispatch(serverActions.save(server)),
    cancelEdit: () => dispatch(routerActions.push(routes.ROOT)),
    requestConnectionTest: (server) => dispatch(serverActions.requestConnectionTest(server))
  })
)(ServerSettings)
