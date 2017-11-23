import React, {Component} from 'react'
import { Field, FormSection } from 'redux-form'

import LabeledInput from '../controls/LabeledInput'

const renderKeysRootPatternField = (field) => (
  <LabeledInput
    placeholder='* (default)'
    {...field.input}
  >
    Keys Root Pattern
  </LabeledInput>
)

const renderKeysFolderSeparatorField = (field) => (
  <LabeledInput
    placeholder='/ (default)'
    {...field.input}
  >
    Keys Folder Separator
  </LabeledInput>
)

const renderConnectionTimeoutField = (field) => (
  <LabeledInput
    placeholder='60 (default)'
    {...field.input}
  >
    Connection Timeout (s)
  </LabeledInput>
)

const renderExecutionTimeoutField = (field) => (
  <LabeledInput
    placeholder='60 (default)'
    {...field.input}
  >
    Execution Timeout (s)
  </LabeledInput>
)

export default class AdvancedServerSettings extends Component {
  render () {
    return (<FormSection
      name='advancedSettings'
      className='advanced-server-settings'
    >
      <Field
        name='keysRootPattern'
        component={renderKeysRootPatternField}
      />
      <Field
        name='keysFolderSeparator'
        component={renderKeysFolderSeparatorField}
      />
      <Field
        name='connectionTimeout'
        component={renderConnectionTimeoutField}
      />
      <Field
        name='executionTimeout'
        component={renderExecutionTimeoutField}
      />
    </FormSection>)
  }
}
