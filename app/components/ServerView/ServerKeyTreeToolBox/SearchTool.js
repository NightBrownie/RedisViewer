import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LabeledInput from '../../controls/LabeledInput'

export default class ServerViewSearchTool extends Component {
  static propTypes = {
    onSearchTermChanged: PropTypes.func
  }

  render () {
    return (<LabeledInput
      className='server-view-search-tool'
      placeholder='Enter filter term...'
      type='text'
      title='Input search term here'
      onChange={
        (event) => this.props.onSearchTermChanged && this.props.onSearchTermChanged(event.target.value)
      }
    >
      <i className='search-icon fa fa-search fa-fw' aria-hidden='true'/>
    </LabeledInput>)
  }
}
