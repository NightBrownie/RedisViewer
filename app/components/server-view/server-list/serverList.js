import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VirtualList from '../../controls/VirtualizedList/VirtualList'
import ServerListItem from './serverListItem'

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes'
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes'
import * as appConstants from '../../../constants/appConstants'
import * as defaultServerConfig from '../../../constants/defaultServerConfig'
import * as serverTreeViewNodeType from '../../../constants/serverTreeViewNodeType'

export const ROOT_FOLDER_NAME = 'Servers'

export default class ServerList extends Component {
  static propTypes = {
    serverList: PropTypes.object.isRequired,
    serverSelected: PropTypes.func.isRequired,
    toggleItemExpand: PropTypes.func.isRequired,
    requestServerKeys: PropTypes.func.isRequired
  }

  getRootFolderListItem () {
    let {itemsExpandedState} = this.props.serverList

    return {
      key: appConstants.ROOT_FOLDER_KEY,
      treeViewSpans: [treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN],
      itemType: treeViewItemTypes.TREE_VIEW_FOLDER_ITEM,
      name: ROOT_FOLDER_NAME,
      isExpanded: !!itemsExpandedState[appConstants.ROOT_FOLDER_KEY],
      onToggleExpand: () => this.props.toggleItemExpand(appConstants.ROOT_FOLDER_KEY)
    }
  }

  getServerListItems () {
    let serverListItems = []

    let {servers, itemsExpandedState, serverKeys, loadingServerKeys} =
      this.props.serverList
    let selectedServer = this.props.serverList.selectedServer

    for (let server of servers) {
      let key = server.id
      let currentServerKeys = serverKeys[key]
      let currentServerKeysLoading = loadingServerKeys[key]
      let currentServerExpanded = !!itemsExpandedState[server.id]
      let isLastItem = servers.indexOf(server) === servers.length - 1

      serverListItems.push({
        key,
        treeViewSpans: [
          treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
          isLastItem
            ? treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN
            : treeViewSpanTypes.TREE_VIEW_NODE_SPAN
        ],
        itemType: treeViewItemTypes.TREE_VIEW_SERVER_ITEM,
        name: server.primarySettings.serverName,
        onSelected: () => this.props.serverSelected(server),
        isSelected: selectedServer && (server.id === selectedServer.id),
        isExpanded: !!itemsExpandedState[server.id],
        onToggleExpand: () => {
          this.props.toggleItemExpand(key)
          !currentServerExpanded && !currentServerKeys && !currentServerKeysLoading &&
          this.props.requestServerKeys(server)
        }
      })

      if (currentServerExpanded && currentServerKeys) {
        serverListItems = [
          ...serverListItems,
          ...this.generateKeyTreeListItems(currentServerKeys,
            [
              treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
              servers.indexOf(server) !== servers.length - 1
                ? treeViewSpanTypes.TREE_VIEW_NODELESS_SPAN
                : treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
            ],
            isLastItem,
            key,
            (server.advancedSettings && server.advancedSettings.keysFolderSeparator) ||
              defaultServerConfig.KEYS_FOLDER_SEPARATOR)
        ]
      }
    }

    return serverListItems
  }

  generateKeyTreeListItems (treeNode = {}, parentTreeViewSpans = [], isLastItem, parentNodeKey, separator) {
    let {itemsExpandedState} = this.props.serverList
    let nodeKey = parentNodeKey + (treeNode.key ? separator + treeNode.key : '')
    let nodeExpanded = !!itemsExpandedState[nodeKey]

    let result = []

    if (treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER) {
      result.push({
        key: nodeKey,
        treeViewSpans: [
          ...parentTreeViewSpans,
          isLastItem
            ? treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN
            : treeViewSpanTypes.TREE_VIEW_NODE_SPAN
        ],
        itemType: treeViewItemTypes.TREE_VIEW_FOLDER_ITEM,
        name: treeNode.name,
        isExpanded: nodeExpanded,
        onToggleExpand: () => this.props.toggleItemExpand(nodeKey)
      })
    } else if (treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY) {
      result.push({
        key: nodeKey,
        treeViewSpans: [
          ...parentTreeViewSpans,
          isLastItem
            ? treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN
            : treeViewSpanTypes.TREE_VIEW_NODE_SPAN
        ],
        itemType: treeViewItemTypes.TREE_VIEW_KEY_ITEM,
        name: treeNode.name,
        isExpanded: nodeExpanded,
        onToggleExpand: () => this.props.toggleItemExpand(nodeKey)
      })
    }

    if (treeNode.nodes && nodeExpanded) {
      result = [
        ...result,
        ...[
          ...treeNode.nodes.filter(node => node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER),
          ...treeNode.nodes.filter(node => node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY)
        ].map((node, index, collection) => this.generateKeyTreeListItems(
          node,
          treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_SERVER
            ? parentTreeViewSpans
            : [
            ...parentTreeViewSpans,
            isLastItem
              ? treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
              : treeViewSpanTypes.TREE_VIEW_NODELESS_SPAN],
          index === collection.length - 1,
          nodeKey,
          separator)
        )
          .reduce((nodeResult, results = []) => [
              ...nodeResult,
              ...results
            ]
          )
      ]
    }

    return result
  }

  render () {
    let rootFolderItem = this.getRootFolderListItem()

    let serverListItems = [
      rootFolderItem,
      ...(rootFolderItem.isExpanded ? this.getServerListItems() : [])
    ]

    return (<div
      ref={(serverListContainer) => this.serverListContainer = serverListContainer}
      className='server-list-container'
    >
      {
        this.serverListContainer && <VirtualList
          className='server-list'
          items={serverListItems}
          itemFactory={(item) => (
            <ServerListItem
              {...item}
            />
          )}
          itemHeight={23}
          bufferSize={5}
          viewport={this.serverListContainer}
        />
      }
    </div>)
  }
}
