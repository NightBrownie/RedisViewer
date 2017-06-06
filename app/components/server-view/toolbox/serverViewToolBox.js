import React, { Component, PropTypes } from 'react'

import Button from '../../controls/button'
import ServerViewSearchTool from './serverViewSearchTool'
import { Redirect } from 'react-router'

import * as routes from '../../../constants/routes'

export default class ServerViewToolBox extends Component {
  static propTypes = {
    requestEditServer: PropTypes.func.isRequired,
    requestRemoveServer: PropTypes.func.isRequired,
    selectedServer: PropTypes.object,
    editServerRequested: PropTypes.bool.isRequired
  }
a
  static defaultProps = {
    editServerRequested: false
  }

  render () {
    if (this.props.editServerRequested) {
      return <Redirect to={routes.EDIT_SERVER} />
    }

    return (<div className='server-view-toolbox'>
      <ServerViewSearchTool />
      <Button
        className='add-server-btn'
        isInactiveTransparentBorder
        onClick={this.props.requestEditServer}
      >
        <i className='add-server-icon fa fa-server fa-fw fa-lg'/>
      </Button>
      <Button
        className='settings-btn'
        isInactiveTransparentBorder
        onClick={() => this.props.requestEditServer(this.props.selectedServer)}
        disabled={!this.props.selectedServer}
      >
        <i className='settings-icon fa fa-cog fa-fw fa-lg'/>
      </Button>
      <Button
        className='remove-btn'
        isInactiveTransparentBorder
        onClick={() => this.props.requestRemoveServer(this.props.selectedServer)}
        disabled={!this.props.selectedServer}
      >
        <i className='remove-icon fa fa-trash-o fa-fw fa-lg'/>
      </Button>
    </div>)
  }
}
