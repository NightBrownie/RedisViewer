import React, {Component} from 'react'

import PrimaryServerSettings from './primaryServerSettings'
import AdvancedServerSettings from './advancedServerSettings'
import Expander from '../expander'
import Button from '../button'

export default class ServerSettings extends Component {
  render () {
    return (<div className='server-settings'>
      <h2 className='server-settings-form-label'>
          Add new server
      </h2>
      <form>
        <PrimaryServerSettings />
        <Expander>
          <AdvancedServerSettings />
        </Expander>

        <div className='buttons-container'>
          <Button className='test-connection-button'>
            <i
              className='test-connection-button-icon fa fa-refresh fa-fw fa-lg'
              aria-hidden='true'
            />
          </Button>
          <Button className='save-server-settings-button'>
              Save
          </Button>
          <Button className='cancel-server-settings-changes-button'>
              Cancel
          </Button>
        </div>
      </form>
    </div>)
  }
}
