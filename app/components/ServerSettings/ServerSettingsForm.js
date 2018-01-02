import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { reduxForm } from 'redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Expander from '../controls/Expander'
import PrimaryServerSettings from './PrimaryServerSettings'
import AdvancedServerSettings from './AdvancedServerSettings'
import Button from '../controls/Button'

class ServerSettingsForm extends Component {
  static propTypes = {
    form: PropTypes.object,

    settingsSaved: PropTypes.bool,
    isEditMode: PropTypes.bool,

    requestConnectionTest: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    saveServer: PropTypes.func.isRequired,
    finishEdit: PropTypes.func.isRequired
  }

  render () {
    const {
      invalid,
      dirty,
      handleSubmit
    } = this.props.form

    return (
      <form
        className='server-settings-form'
        onSubmit={handleSubmit(formData => {
          if (dirty) {
            this.props.saveServer(formData)
          }

          this.props.finishEdit()
        })}
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

          {this.props.isEditMode && (
            <TransitionGroup component='span'>
              {this.props.settingsSaved === true && (
                <CSSTransition
                  timeout={300}
                  classNames='saving-result-message_shown'
                >
                  <span className={classNames('saving-result-message',
                      'saving-result-message_success'
                    )}
                  >
                    <span className='fa-stack fa-fw saving-result-message__icon'>
                      <i className='fa fa-circle-thin fa-stack-2x' />
                      <i className='fa fa-check fa-stack-1x' />
                    </span>

                    <span className='saving-result-message__text'>
                      Settings successfully saved
                    </span>
                  </span>
                </CSSTransition>
              )}

              {this.props.settingsSaved === false && (
                <CSSTransition
                  timeout={300}
                  classNames='saving-result-message_shown'
                >
                  <span className={classNames('saving-result-message',
                      'saving-result-message_failure'
                    )}
                  >
                    <span className='fa-stack fa-fw saving-result-message__icon'>
                      <i className='fa fa-circle-thin fa-stack-2x' />
                      <i className='fa fa-exclamation fa-stack-1x' />
                    </span>

                    <span className='saving-result-message__text'>
                      Settings failed to save, try again
                    </span>
                  </span>
                </CSSTransition>
              )}
            </TransitionGroup>
          )}

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
              disabled={invalid || !dirty}
              onClick={handleSubmit(this.props.saveServer)}
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
