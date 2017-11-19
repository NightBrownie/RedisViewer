import React from 'react'
import {connect} from 'react-redux'
import { routerActions } from 'react-router-redux'

import * as serverActions from '../actions/server'
import * as routes from '../constants/routes'

import ServerSettings from '../components/server-settings/serverSettings'

export default connect(
  state => ({
    shouldRedirectToTheRoot: state.serverSettings.shouldRedirectToTheRoot,
    initialServerSettings: state.serverSettings.initialServerSettings
  }),
  dispatch => ({
    saveServer: (server) => dispatch(serverActions.setServer(server)),
    cancelEdit: () => dispatch(routerActions.push(routes.ROOT)),
    requestConnectionTest: (server) => dispatch(serverActions.requestConnectionTest(server))
  })
)(ServerSettings)
