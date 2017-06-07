import React, { Component } from 'react'
import { Field, FormSection } from 'redux-form'
import { required } from 'redux-form-validators/lib'

import LabeledInput from '../controls/labeledInput'

const renderServerNameField = (field) => (
  <LabeledInput
    isRequired
    placeholder='Enter server name'
    errors={(field.meta.touched && field.meta.invalid)
      ? field.meta.error
      : null
    }
    errorPrefix='Field '
    {...field.input}
  >
    Server Name
  </LabeledInput>
)

const renderHostIPField = (field) => (
  <LabeledInput
    placeholder='127.0.0.1 (default)'
    {...field.input}
  >
    Host / IP
  </LabeledInput>
)

const renderPortField = (field) => (
  <LabeledInput
    placeholder='6379 (default)'
    type='number'
    min={0}
    max={65535}
    {...field.input}
  >
    Port
  </LabeledInput>
)

const renderPasswordField = (field) => (
  <LabeledInput
    placeholder='empty (default if no password required by the server)'
    type='password'
    {...field.input}
  >
    Password
  </LabeledInput>
)

export default class PrimaryServerSettings extends Component {
  render () {
    return (<FormSection
      name='primarySettings'
      className='primary-server-settings'
    >
      <Field
        name='serverName'
        component={renderServerNameField}
        validate={[required()]}
      />
      <Field
        name='host'
        component={renderHostIPField}
      />
      <Field
        name='port'
        component={renderPortField}
      />
      <Field
        name='password'
        component={renderPasswordField}
      />
    </FormSection>)
  }
}
