import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import routes from '../../constants/routes'

import ServerSettingsForm from './ServerSettingsForm'

export default class ServerSettings extends Component {
  static propTypes = {
    initialServerSettings: PropTypes.object,
    shouldRedirectToTheRoot: PropTypes.bool,
    saveServer: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    requestConnectionTest: PropTypes.func.isRequired
  }

  static defaultProps = {
    shouldRedirectToTheRoot: false
  }

  saveServer (server) {
    let resultServer = {
      ...this.props.initialServerSettings,
      ...server
    }
    this.props.saveServer(resultServer);
  }

  render () {
    if (this.props.shouldRedirectToTheRoot) {
      return (
        <Redirect to={routes.ROOT} />
      )
    }

    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
        {
          !this.props.initialServerSettings
          ? 'Add new server'
          :'Edit server'
        }
      </h2>

      <ServerSettingsForm
        initialValues={this.props.initialServerSettings}
        enableReinitialize={true}
        onSubmit={::this.saveServer}
        requestConnectionTest={this.props.requestConnectionTest}
        cancelEdit={this.props.cancelEdit}
      />
    </div>)
  }
}
