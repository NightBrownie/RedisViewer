import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Expander from '../controls/Expander'
import PrimaryServerSettings from './PrimaryServerSettings'
import AdvancedServerSettings from './AdvancedServerSettings'
import Button from '../controls/Button'
import { reduxForm } from 'redux-form'

class ServerSettingsForm extends Component {
  static propTypes = {
    requestConnectionTest: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    invalid: PropTypes.bool
  }

  render () {
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
          onClick={this.props.requestConnectionTest}
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
          onClick={this.props.cancelEdit}
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
