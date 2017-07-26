import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import VirtualList from '../../controls/VirtualizedList/VirtualList'
import ServerListItem from './serverListItem'

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes'
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes'
import * as appConstants from '../../../constants/appConstants'
import * as defaultServerConfig from '../../../constants/defaultServerConfig'
import * as serverTreeViewNodeType from '../../../constants/serverTreeViewNodeType'
import * as routes from '../../../constants/routes'

export default class ServerList extends Component {
  static propTypes = {
    serverList: PropTypes.object.isRequired,
    serverSelected: PropTypes.func.isRequired,
    keySelected: PropTypes.func.isRequired,
    openKey: PropTypes.func.isRequired,
    toggleItemExpand: PropTypes.func.isRequired,
    requestServerKeys: PropTypes.func.isRequired
  }

  getListItems () {
    return this.getNodeListItems(this.getListItemsTree())
  }

  getNodeListItems(node, parentListItemSpans = [], isLast = true) {
    let childNodes = node.nodes || []
    let childNodeListItems = childNodes
      .map(childNode =>
        this.getNodeListItems(childNode,
          [
            ...parentListItemSpans,
            isLast
              ? treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
              : treeViewSpanTypes.TREE_VIEW_NODELESS_SPAN
          ],
        ))
      .reduce((accumulator, nodeListItems) => [
        ...accumulator,
        ...nodeListItems
      ], [])

    return [
      {
        ...node.listItem,
        treeViewSpans: [
          ...parentListItemSpans,
          parentListItemSpans.length
            ? isLast
              ? treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN
              : treeViewSpanTypes.TREE_VIEW_NODE_SPAN
            : treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
        ]
      },
      ...childNodeListItems
    ]
  }

  getListItemsTree () {
    let {itemsExpandedState} = this.props.serverList

    return {
      listItem: {
        key: appConstants.ROOT_FOLDER_NAME,
        itemType: treeViewItemTypes.TREE_VIEW_FOLDER_ITEM,
        name: appConstants.ROOT_FOLDER_NAME,
        isExpanded: !!itemsExpandedState[appConstants.ROOT_FOLDER_NAME],
        onToggleExpand: () => this.props.toggleItemExpand(appConstants.ROOT_FOLDER_NAME)
      },
      nodes: this.getServerListItemsNodes()
    }
  }

  getServerListItemsNodes () {
    let serverListItemsNodes = []

    let {
      servers,
      itemsExpandedState,
      filteredServerKeys,
      loadingServerKeys,
      filterTerm,
      selectedServer,
      selectedKey
    } = this.props.serverList

    for (let server of servers) {
      let separator = (server.advancedSettings && server.advancedSettings.keysFolderSeparator) ||
        defaultServerConfig.KEYS_FOLDER_SEPARATOR
      let key = server.id
      let currentServerKeys = filteredServerKeys[key]
      let currentServerKeysLoading = loadingServerKeys[key]
      let currentServerExpanded = !!itemsExpandedState[server.id]

      if (!filterTerm ||
        server.primarySettings.serverName.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0 ||
        (currentServerKeys && currentServerKeys.nodes.length)) {

        let serverListItem = {
          key,
          itemType: treeViewItemTypes.TREE_VIEW_SERVER_ITEM,
          name: server.primarySettings.serverName,
          onSelected: () => this.props.serverSelected(server),
          isSelected: selectedServer && (server.id === selectedServer.id)
          && !selectedKey,
          isExpanded: !!itemsExpandedState[server.id],
          onToggleExpand: () => {
            this.props.toggleItemExpand(key)
            !currentServerExpanded && !currentServerKeys && !currentServerKeysLoading &&
            this.props.requestServerKeys(server)
          }
        }

        let serverListItemNode = {
          listItem: serverListItem
        }

        if (currentServerExpanded && currentServerKeys) {
          serverListItemNode.nodes = this.getServerKeysListItemsNodes(currentServerKeys,
            key,
            server.primarySettings.serverName,
            separator,
            server)
        }

        serverListItemsNodes.push(serverListItemNode)
      }
    }

    return serverListItemsNodes
  }

  getServerKeysListItemsNodes (
    serverListNode,
    treeNode = {},
    parentNodeKey,
    parentNodeTitle,
    separator,
    server
  ) {
    if (!serverListNode)
    {
      return
    }

    let {
      itemsExpandedState,
      selectedServer,
      selectedKey
    } = this.props.serverList

    let nodeKey = parentNodeKey + (treeNode.key ? separator + treeNode.key : '')
    let nodeTitle = parentNodeTitle + (treeNode.key ? separator + treeNode.key : '')
    let nodeExpanded = !!itemsExpandedState[nodeKey]

    let serverKeysListItemsNodes = []

    if (treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER
      || treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY) {
      serverKeysListItemsNodes.push({
        key: nodeKey,
        title: nodeTitle,
        itemType: treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER
          ? treeViewItemTypes.TREE_VIEW_FOLDER_ITEM
          : treeViewItemTypes.TREE_VIEW_KEY_ITEM,
        name: treeNode.name,
        isExpanded: nodeExpanded,
        isSelected: selectedServer && (selectedServer.id === server.id)
        && selectedKey && (selectedKey === nodeKey),
        onSelected: treeNode.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY
          ? () => {
            this.props.keySelected(server, nodeKey)
            this.props.openKey(server, treeNode.key)
          }
          : null,
        onToggleExpand: () => this.props.toggleItemExpand(nodeKey)
      })

      if (treeNode.nodes && nodeExpanded) {
        serverKeysListItemsNodes = [
          ...serverKeysListItemsNodes,
          ...[
            ...treeNode.nodes.filter(node => node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER),
            ...treeNode.nodes.filter(node => node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY)
          ].map((node, index, collection) => this.getServerKeysListItemsNodes(
            node,
            nodeKey,
            nodeTitle,
            separator,
            server)
          )
            .reduce((nodeResult, results = []) => [
                ...nodeResult,
                ...results
              ]
            )
        ]
      }
    }

    return serverKeysListItemsNodes
  }

  render () {
    let {shouldRedirectToKeyView} = this.props.serverList

    let serverListItems = this.getListItems()

    return (<div
      ref={(serverListContainer) => this.serverListContainer = serverListContainer}
      className='server-list-container'
    >
      { shouldRedirectToKeyView && <Redirect to={routes.KEY_VIEW}/> }

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
          bufferSize={0}
          viewport={this.serverListContainer}
        />
      }
    </div>)
  }
}
