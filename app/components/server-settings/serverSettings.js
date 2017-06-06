import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import * as routes from '../../constants/routes'

import ServerSettingsForm from './serverSettingsForm'

export default class ServerSettings extends Component {
  static propTypes = {
    initialServerSettings: PropTypes.object,
    serverSuccessfullySaved: PropTypes.bool,
    mode: PropTypes.oneOf(['add', 'edit']).isRequired,
    saveServer: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    requestConnectionTest: PropTypes.func.isRequired
  }

  static defaultProps = {
    initialServerSettings: {},
    serverSuccessfullySaved: false,
    mode: 'add'
  }

  saveServer (server) {
    let resultServer = {
      ...this.props.initialServerSettings,
      ...server
    }
    this.props.saveServer(resultServer);
  }

  render () {
    if (this.props.serverSuccessfullySaved) {
      return (
        <Redirect to={routes.ROOT} />
      )
    }

    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
        {this.props.mode === 'add' ? 'Add new server' :'Edit server'}
      </h2>

      <ServerSettingsForm
        initialValues={this.props.initialServerSettings}
        onSubmit={::this.saveServer}
        requestConnectionTest={this.props.requestConnectionTest}
        cancelEdit={this.props.cancelEdit}
      />
    </div>)
  }
}
