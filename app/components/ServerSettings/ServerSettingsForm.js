import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Expander from '../controls/Expander'
import PrimaryServerSettings from './PrimaryServerSettings'
import AdvancedServerSettings from './AdvancedServerSettings'
import Button from '../controls/Button'
import { reduxForm } from 'redux-form'

class ServerSettingsForm extends Component {
  static propTypes = {
    form: PropTypes.object,

    isEditMode: PropTypes.bool,

    requestConnectionTest: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    saveServer: PropTypes.func.isRequired
  }

  render () {
    const { invalid, handleSubmit } = this.props.form

    return (
      <form
        className='server-settings-form'
        onSubmit={handleSubmit}
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
            disabled={invalid}
            onClick={this.props.requestConnectionTest}
          >
            <i className='test-connection-button-icon fa fa-refresh fa-fw fa-lg' />
          </Button>
          <Button
            className='server-settings__submit-button'
            type='submit'
            disabled={invalid}
          >
            {this.props.isEditMode ? 'Ok' : 'Save'}
          </Button>
          {this.props.isEditMode && (
            <Button
              className='server-settings__save-button'
              type='button'
              disabled={invalid}
              onClick={() => this.props.saveServer()}
            >
              Save
            </Button>
          )}
          <Button
            className='server-settings__cancel-changes-button'
            type='button'
            onClick={this.props.cancelEdit}
          >
            Cancel
          </Button>
        </div>
      </form>
    )
  }
}

const ServerSettingsReduxForm = reduxForm({
  form: 'serverSettings',
  propNamespace: 'form'
})(ServerSettingsForm)

export default ServerSettingsReduxForm
