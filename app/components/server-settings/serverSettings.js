import React, {Component} from 'react'

import PrimaryServerSettings from './primaryServerSettings'
import AdvancedServerSettings from './advancedServerSettings'
import Expander from '../controls/expander'
import Button from '../controls/button'
import ServerSettingsForm from './serverSettingsForm'

export default class ServerSettings extends Component {
  handleSubmit (formValues) {
    console.log('Server settings have been saved')
    console.log(formValues)
  }

  render () {
    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
          Add new server
      </h2>

      <ServerSettingsForm
        initialValues={{}}
        onSubmit={this.handleSubmit}
      />
    </div>)
  }
}
