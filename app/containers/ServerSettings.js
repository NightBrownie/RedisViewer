import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import serverActions from '../actions/server'
import routes from '../constants/routes'

import ServerSettings from '../components/ServerSettings'

const ServerSettingsContainer = withRouter(connect(
  (state, { isEditMode, history }) => ({
    editingSettings: state.serverSettings.editingSettings,
    settingsSaved: state.serverSettings.settingsSaved,
    history,
    isEditMode
  }),
  (dispatch, { history }) => ({
    saveServer: (server) => dispatch(serverActions.save(server)),
    cancelEdit: () => history.push(routes.ROOT),
    requestConnectionTest: (server) => dispatch(serverActions.requestConnectionTest(server))
  })
)(ServerSettings))

ServerSettingsContainer.propTypes = {
  isEditMode: PropTypes.bool
}

export default ServerSettingsContainer
