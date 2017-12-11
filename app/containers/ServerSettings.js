import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import serverActions from '../actions/server'
import routes from '../constants/routes'

import ServerSettings from '../components/ServerSettings'

export default withRouter(connect(
  state => ({
    editingSettings: state.serverSettings.editingSettings,
    settingsSaved: state.serverSettings.settingsSaved,
    isEditMode: state.serverSettings.isEditMode
  }),
  (dispatch, { history }) => ({
    saveServer: (server) => dispatch(serverActions.save(server)),
    cancelEdit: () => history.push(routes.ROOT),
    requestConnectionTest: (server) => dispatch(serverActions.requestConnectionTest(server))
  })
)(ServerSettings))
