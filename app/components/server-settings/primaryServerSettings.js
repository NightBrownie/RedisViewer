import React, {Component} from 'react'

import LabeledInput from '../labeledInput'

export default class PrimaryServerSettings extends Component {
  render () {
    return <div className='primary-server-settings'>
      <LabeledInput
        isRequired
        placeholder='Enter server name'
      >
        Server Name
      </LabeledInput>
      <LabeledInput placeholder='127.0.0.1 (default)'>
        Host / IP
      </LabeledInput>
      <LabeledInput
          placeholder='6379 (default)'
          type='number'
          min={0}
          max={65535}
      >
        Port
      </LabeledInput>
      <LabeledInput placeholder='empty (default if no password required by the server)'>
        Password
      </LabeledInput>
    </div>
  }
}
