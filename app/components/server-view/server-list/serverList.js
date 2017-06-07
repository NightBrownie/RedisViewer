import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ServerListItem from './serverListItem'

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes'
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes'

export default class ServerList extends Component {
  static propTypes = {
    serverList: PropTypes.object.isRequired,
    serverSelected: PropTypes.func.isRequired
  }

  getRootFolderListItem () {
    return [
      {
        key: 'root',
        treeViewSpans: [treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN],
        itemType: treeViewItemTypes.TREE_VIEW_FOLDER_ITEM,
        name: 'Servers'
      }
    ]
  }

  getServerListItems () {
    let serverListItems = []

    let servers = this.props.serverList.servers
    let selectedServer = this.props.serverList.selectedServer

    for (let server of servers) {
      serverListItems.push({
        key: server.id,
        treeViewSpans: [
          treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
          servers.indexOf(server) !== servers.length - 1
            ? treeViewSpanTypes.TREE_VIEW_NODE_SPAN
            : treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN
        ],
        itemType: treeViewItemTypes.TREE_VIEW_SERVER_ITEM,
        name: server.primarySettings.serverName,
        onSelected: () => this.props.serverSelected(server),
        isSelected: selectedServer && (server.id === selectedServer.id)
      })
    }

    return serverListItems
  }

  render () {
    let serverListItems = [
      ...this.getRootFolderListItem(),
      ...this.getServerListItems()
    ]

    return (<div className='server-list-container'>
      <ul className='server-list'>
        {
          serverListItems.map((serverListItem) => (
            <ServerListItem
              {...serverListItem}
            />
          ))
        }
      </ul>
    </div>)
  }
}
