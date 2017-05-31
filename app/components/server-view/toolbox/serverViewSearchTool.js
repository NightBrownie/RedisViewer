import React, { Component } from 'react'

import LabeledInput from '../../labeledInput'

export default class ServerViewSearchTool extends Component {
  render () {
    return (<LabeledInput
      className='server-view-search-tool'
      placeholder='Enter filter term...'
      type='text'
      title='Input search term here'
        >
      <i className='search-icon fa fa-search fa-fw' aria-hidden='true' />
    </LabeledInput>)
  }
}
