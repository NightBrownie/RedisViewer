import React, { Component, PropTypes } from 'react'

import Button from '../../controls/Button'
import ServerViewSearchTool from './SearchTool'
import { Redirect } from 'react-router'

export default class ServerViewToolBox extends Component {
  static propTypes = {
    requestAddServer: PropTypes.func.isRequired,
    requestEditServer: PropTypes.func.isRequired,
    requestRemoveServer: PropTypes.func.isRequired,
    selectedServer: PropTypes.object,
    editServerRequested: PropTypes.bool.isRequired,
    filterChanged: PropTypes.func
  }

  static defaultProps = {
    editServerRequested: false
  }

  render () {
    return (
      <div className='server-view-toolbox'>
        <ServerViewSearchTool
          onSearchTermChanged={this.props.filterChanged}
        />
        <Button
          className='add-server-btn'
          isInactiveTransparentBorder
          onClick={() => this.props.requestAddServer()}
        >
          <i className='add-server-icon fa fa-plus fa-fw fa-lg' />
        </Button>
        <Button
          className='settings-btn'
          isInactiveTransparentBorder
          onClick={() => this.props.requestEditServer(this.props.selectedServer)}
          disabled={!this.props.selectedServer}
        >
          <i className='settings-icon fa fa-ellipsis-v fa-fw fa-lg' />
        </Button>
        <Button
          className='remove-btn'
          isInactiveTransparentBorder
          onClick={() => this.props.requestRemoveServer(this.props.selectedServer)}
          disabled={!this.props.selectedServer}
        >
          <i className='remove-icon fa fa-trash-o fa-fw fa-lg' />
        </Button>
      </div>
    )
  }
}
