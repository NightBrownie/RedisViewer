import React, { Component, PropTypes } from 'react'
import { Redirect } from 'react-router'

import Button from '../../controls/button'
import ServerViewSearchTool from './serverViewSearchTool'

export default class ServerViewToolBox extends Component {
  static propTypes = {
    requestAddServer: PropTypes.func.isRequired,
    addServerRequested: PropTypes.bool.isRequired
  }

  static defaultProps = {
    addServerRequested: false
  }

  render () {
    return (<div className='server-view-toolbox'>
      <ServerViewSearchTool />
      <Button
        className='add-server-btn'
        isInactiveTransparentBorder
        onClick={this.props.requestAddServer}
      >
        <i className='add-server-icon fa fa-server fa-fw fa-lg' />
      </Button>
      <Button
        className='settings-btn'
        isInactiveTransparentBorder
      >
        <i className='settings-icon fa fa-cog fa-fw fa-lg' />
      </Button>
      <Button
        className='remove-btn'
        isInactiveTransparentBorder
      >
        <i className='remove-icon fa fa-trash-o fa-fw fa-lg' />
      </Button>
    </div>)
  }
}
