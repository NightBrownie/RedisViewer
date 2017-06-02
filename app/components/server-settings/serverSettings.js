import React, {Component} from 'react'

import PrimaryServerSettings from './primaryServerSettings'
import AdvancedServerSettings from './advancedServerSettings'
import Expander from '../controls/expander'
import Button from '../controls/button'

export default class ServerSettings extends Component {
  render () {
    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
          Add new server
      </h2>
      <form className='server-settings-form'>
        <PrimaryServerSettings />
        <Expander
          className='advanced-server-setting-expander'
          label='Advanced settings'
        >
          <AdvancedServerSettings />
        </Expander>

        <div className='buttons-container'>
          <Button
            className='test-connection-button'
            type='button'
          >
            <i
              className='test-connection-button-icon fa fa-refresh fa-fw fa-lg'
              aria-hidden='true'
            />
          </Button>

          <Button
            className='save-server-settings-button'
            type='submit'
          >
              Save
          </Button>
          <Button
            className='cancel-server-settings-changes-button'
            type='button'
          >
              Cancel
          </Button>
        </div>
      </form>
    </div>)
  }
}