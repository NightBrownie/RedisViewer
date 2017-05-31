import React, {Component} from 'react'

import LabeledInput from '../controls/labeledInput'

export default class AdvancedServerSettings extends Component {
  render () {
    return <div className='advanced-server-settings'>
      <LabeledInput placeholder='* (default)'>
        Keys Root Pattern
      </LabeledInput>
      <LabeledInput placeholder='/ (default)'>
        Keys Folder Separator
      </LabeledInput>
      <LabeledInput placeholder='60 (default)'>
        Connection Timeout (s)
      </LabeledInput>
      <LabeledInput placeholder='60 (default)'>
        Execution Timeout (s)
      </LabeledInput>
    </div>
  }
}
