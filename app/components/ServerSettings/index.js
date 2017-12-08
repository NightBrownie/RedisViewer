import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import routes from '../../constants/routes'

import ServerSettingsForm from './ServerSettingsForm'

export default class ServerSettings extends Component {
  static propTypes = {
    editingSettings: PropTypes.object,
    settingsSaved: PropTypes.bool,
    isEditMode: PropTypes.bool,

    saveServer: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    requestConnectionTest: PropTypes.func.isRequired
  }

  saveServer (server) {
    let resultServer = {
      ...this.props.editingSettings,
      ...server
    }
    this.props.saveServer(resultServer)
  }

  // TODO: add mark that settings are saved
  render () {
    if (this.props.editingSettings === null && this.props.isEditMode) {
      return (
        <Redirect to={routes.ROOT} />
      )
    }

    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
        {
          this.props.isEditMode
            ? 'Edit server'
            : 'Add new server'
        }
      </h2>

      <ServerSettingsForm
        enableReinitialize
        initialValues={this.props.editingSettings}
        onSubmit={::this.saveServer}
        requestConnectionTest={this.props.requestConnectionTest}
        cancelEdit={this.props.cancelEdit}
      />
    </div>)
  }
}
