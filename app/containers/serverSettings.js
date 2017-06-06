import React from 'react'
import {connect} from 'react-redux'
import { routerActions } from 'react-router-redux'

import * as serverActions from '../actions/serverActions'
import * as routes from '../constants/routes'

import ServerSettings from '../components/server-settings/serverSettings'

export default connect(
  state => ({
    serverSuccessfullySaved: state.serverSettings.serverSuccessfullySaved
  }),
  dispatch => ({
    saveServer: (server) => dispatch(serverActions.setServer(server)),
    cancelEdit: () => dispatch(routerActions.push(routes.ROOT)),
    requestConnectionTest: (server) => dispatch(serverActions.requestConnectionTest(server))
  })
)(ServerSettings)