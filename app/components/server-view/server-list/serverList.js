import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ServerListItem from './serverListItem'

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes'
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes'
import * as appConstants from '../../../constants/appConstants'

export default class ServerList extends Component {
  static propTypes = {
    serverList: PropTypes.object.isRequired,
    serverSelected: PropTypes.func.isRequired,
    toggleItemExpand: PropTypes.func.isRequired,
    requestServerKeys: PropTypes.func.isRequired
  }

  getRootFolderListItem () {
    let { itemsExpandedState } = this.props.serverList

    return {
      key: appConstants.ROOT_FOLDER_KEY,
      treeViewSpans: [treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN],
      itemType: treeViewItemTypes.TREE_VIEW_FOLDER_ITEM,
      name: 'Servers',
      isExpanded: !!itemsExpandedState[appConstants.ROOT_FOLDER_KEY],
      onToggleExpand: () => this.props.toggleItemExpand(appConstants.ROOT_FOLDER_KEY)
    }
  }

  getServerListItems () {
    let serverListItems = []

    let { servers, itemsExpandedState, serverKeys, loadingServerKeys } =
      this.props.serverList
    let selectedServer = this.props.serverList.selectedServer

    for (let server of servers) {
      let key = server.id
      let currentServerKeys = serverKeys[key]
      let currentServerKeysLoading = loadingServerKeys[key]

      serverListItems.push({
        key,
        treeViewSpans: [
          treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
          servers.indexOf(server) !== servers.length - 1
            ? treeViewSpanTypes.TREE_VIEW_NODE_SPAN
            : treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN
        ],
        itemType: treeViewItemTypes.TREE_VIEW_SERVER_ITEM,
        name: server.primarySettings.serverName,
        onSelected: () => this.props.serverSelected(server),
        isSelected: selectedServer && (server.id === selectedServer.id),
        isExpanded: !!itemsExpandedState[server.id],
        onToggleExpand: () => {
          this.props.toggleItemExpand(key)
          !currentServerKeys && !currentServerKeysLoading && this.props.requestServerKeys(server)
        }
      })
    }

    return serverListItems
  }

  render () {
    let rootFolderItem = this.getRootFolderListItem()

    let serverListItems = [
      rootFolderItem,
      ...(rootFolderItem.isExpanded ? this.getServerListItems() : [])
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
