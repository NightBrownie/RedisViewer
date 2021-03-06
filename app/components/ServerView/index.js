import React, { Component, PropTypes } from 'react'

import ServerViewToolBox from './ServerKeyTreeToolBox'
import ServerList from './ServerKeyTree'

export default class ServerView extends Component {
  static propTypes = {
    requestServerList: PropTypes.func.isRequired,
    requestAddServer: PropTypes.func.isRequired,
    requestEditServer: PropTypes.func.isRequired,
    requestRemoveServer: PropTypes.func.isRequired,
    editServerRequested: PropTypes.bool.isRequired,
    serverKeyTree: PropTypes.object.isRequired,
    keySelected: PropTypes.func.isRequired,
    openKey: PropTypes.func.isRequired,
    serverSelected: PropTypes.func.isRequired,
    selectedKey: PropTypes.string,
    selectedServer: PropTypes.object,
    toggleServerListItemExpand: PropTypes.func.isRequired,
    requestKeys: PropTypes.func.isRequired,
    filterChanged: PropTypes.func
  };

  static defaultProps = {
    editServerRequested: false
  };

  componentWillMount () {
    this.props.requestServerList()
  }

  render () {
    return (
      <div className='server-view'>
        <ServerViewToolBox
          requestAddServer={this.props.requestAddServer}
          requestEditServer={this.props.requestEditServer}
          requestRemoveServer={this.props.requestRemoveServer}
          editServerRequested={this.props.editServerRequested}
          selectedServer={!this.props.selectedKey ? this.props.selectedServer : null}
          filterChanged={this.props.filterChanged}
        />
        <ServerList
          serverKeyTree={this.props.serverKeyTree}
          serverSelected={this.props.serverSelected}
          toggleItemExpand={this.props.toggleServerListItemExpand}
          requestServerKeys={this.props.requestKeys}
          openKey={this.props.openKey}
          keySelected={this.props.keySelected}
        />
      </div>
    )
  }
}
