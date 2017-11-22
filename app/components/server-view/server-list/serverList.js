import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import VirtualList from '../../controls/VirtualizedList/VirtualList'
import ServerListItem from './serverListItem'

import treeViewSpanTypes from '../../../constants/treeViewSpanType'
import treeViewItemTypes from '../../../constants/treeViewItemType'
import appConstants from '../../../constants/appConstants'
import defaultServerConfig from '../../../constants/defaultServerConfig'
import serverTreeViewNodeType from '../../../constants/serverTreeViewNodeType'
import routes from '../../../constants/routes'

export default class ServerList extends Component {
  static propTypes = {
    serverKeyTree: PropTypes.object.isRequired,
    serverSelected: PropTypes.func.isRequired,
    keySelected: PropTypes.func.isRequired,
    openKey: PropTypes.func.isRequired,
    toggleItemExpand: PropTypes.func.isRequired,
    requestServerKeys: PropTypes.func.isRequired
  }

  getListItemsTree () {
    let {itemsExpandedState} = this.props.serverKeyTree

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

  getNodeListItems (node, parentListItemSpans = [], isLast = true) {
    let childNodes = (node.listItem.isExpanded && node.nodes) || []
    let childNodeListItems = childNodes
      .map((childNode, index) =>
        this.getNodeListItems(childNode,
          [
            ...parentListItemSpans,
            isLast
              ? treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
              : treeViewSpanTypes.TREE_VIEW_NODELESS_SPAN
          ],
          index === childNodes.length - 1
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
            ? (isLast ? treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN : treeViewSpanTypes.TREE_VIEW_NODE_SPAN)
            : treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
        ]
      },
      ...childNodeListItems
    ]
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
    } = this.props.serverKeyTree

    for (let server of servers) {
      let separator = (server.advancedSettings && server.advancedSettings.keysFolderSeparator) ||
        defaultServerConfig.KEYS_FOLDER_SEPARATOR
      let key = server.id
      let currentServerKeysNode = filteredServerKeys[key]
      let currentServerKeysLoading = loadingServerKeys[key]
      let currentServerExpanded = !!itemsExpandedState[server.id]

      if (!filterTerm ||
        server.primarySettings.serverName.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0 ||
        (currentServerKeysNode && currentServerKeysNode.nodes.length)) {

        let serverListItem = {
          key,
          itemType: treeViewItemTypes.TREE_VIEW_SERVER_ITEM,
          name: server.primarySettings.serverName,
          onSelected: () => this.props.serverSelected(server),
          isSelected: selectedServer && (server.id === selectedServer.id) &&
            !selectedKey,
          isExpanded: !!itemsExpandedState[server.id],
          onToggleExpand: () => {
            this.props.toggleItemExpand(key)

            !currentServerExpanded && !currentServerKeysNode && !currentServerKeysLoading &&
              this.props.requestServerKeys(server)
          }
        }

        let serverListItemNode = {
          listItem: serverListItem
        }

        if (currentServerExpanded && currentServerKeysNode) {
          serverListItemNode.nodes = this.getServerKeysListItemsNodes(currentServerKeysNode,
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
    parentNode = {},
    parentNodeKey,
    parentNodeTitle,
    separator,
    server
  ) {
    let {
      itemsExpandedState,
      selectedServer,
      selectedKey
    } = this.props.serverKeyTree

    let serverKeysListItemsNodes

    let nodeExpanded = !!itemsExpandedState[parentNodeKey]

    if (parentNode.nodes && nodeExpanded) {
      serverKeysListItemsNodes = [
        ...parentNode.nodes.filter(node => node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER),
        ...parentNode.nodes.filter(node => node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY)
      ].map((node) => {
        let nodeKey = parentNodeKey + (node.name ? separator + node.name : '')
        let nodeTitle = parentNodeTitle + (node.name ? separator + node.name : '')
        let nodeExpanded = !!itemsExpandedState[nodeKey]

        return {
          listItem: {
            key: nodeKey,
            title: nodeTitle,
            itemType: node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER
              ? treeViewItemTypes.TREE_VIEW_FOLDER_ITEM
              : treeViewItemTypes.TREE_VIEW_KEY_ITEM,
            name: node.name,
            isExpanded: nodeExpanded,
            isSelected: selectedServer && (selectedServer.id === server.id)
            && selectedKey && (selectedKey === nodeKey),
            onSelected: node.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY
              ? () => {
                this.props.keySelected(server, nodeKey)
                this.props.openKey(server, node.key)
              }
              : null,
            onToggleExpand: () => this.props.toggleItemExpand(nodeKey)
          },
          nodes: this.getServerKeysListItemsNodes(node,
            nodeKey,
            nodeTitle,
            separator,
            server)
        }
      })
    }

    return serverKeysListItemsNodes
  }

  render () {
    let {shouldRedirectToKeyView} = this.props.serverKeyTree

    let serverListItems = this.getNodeListItems(this.getListItemsTree())

    return (<div
      ref={(serverListContainer) => (this.serverListContainer = serverListContainer)}
      className='server-list-container'
    >
      {shouldRedirectToKeyView && <Redirect to={routes.KEY_VIEW} />}

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
