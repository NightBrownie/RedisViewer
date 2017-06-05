import React, {Component} from 'react'
import PropTypes from 'prop-types';

import Expander from '../controls/expander'
import PrimaryServerSettings from './primaryServerSettings'
import AdvancedServerSettings from './advancedServerSettings'
import Button from '../controls/button'
import { reduxForm } from 'redux-form'

class ServerSettingsForm extends Component {
  static propTypes = {
    requestTestConnection: PropTypes.func,
    invalid: PropTypes.bool
  }

  render () {

    console.log(this.props)
    return (<form
      className='server-settings-form'
      onSubmit={this.props.handleSubmit}
    >
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
          disabled={this.props.invalid}
        >
          <i
            className='test-connection-button-icon fa fa-refresh fa-fw fa-lg'
            aria-hidden='true'
          />
        </Button>
        <Button
          className='save-server-settings-button'
          type='submit'
          disabled={this.props.invalid}
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
    </form>)
  }
}

const ServerSettingsReduxForm = reduxForm({
  form: 'serverSettings'
})(ServerSettingsForm)

export default ServerSettingsReduxForm
