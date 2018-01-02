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
    finishEdit: PropTypes.func.isRequired,
    requestConnectionTest: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.saveServer = ::this.saveServer
  }

  saveServer (server) {
    this.props.saveServer({
      ...this.props.editingSettings,
      ...server
    })
  }

  render () {
    if (this.props.editingSettings === null && this.props.isEditMode) {
      return (
        <Redirect to={routes.ROOT} />
      )
    }

    return (
      <div className='server-settings'>
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
          isEditMode={this.props.isEditMode}
          settingsSaved={this.props.settingsSaved}

          requestConnectionTest={this.props.requestConnectionTest}
          saveServer={this.saveServer}
          finishEdit={this.props.finishEdit}
          cancelEdit={this.props.cancelEdit}
        />
      </div>
    )
  }
}
