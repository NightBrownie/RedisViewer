import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ServerSettingsForm from './serverSettingsForm'

export default class ServerSettings extends Component {
  static propTypes = {
    initialServerSettings: PropTypes.object,
    saveServer: PropTypes.func.isRequired
  }

  static defaultProps = {
    initialServerSettings: {}
  }

  render () {
    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
          Add new server
      </h2>

      <ServerSettingsForm
        initialValues={this.props.initialServerSettings}
        onSubmit={this.props.saveServer}
      />
    </div>)
  }
}
