import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ServerListItem from './serverListItem'

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes'
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes'
import * as appConstants from '../../../constants/appConstants'
import * as defaultServerConfig from '../../../constants/defaultServerConfig'

const ROOT_FOLDER_NAME = 'Servers'
const KEY_PATH_TYPE_FOLDER = 'folder'
const KEY_PATH_TYPE_KEY = 'key'

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
          !itemsExpandedState[server.id] && !currentServerKeys && !currentServerKeysLoading &&
          this.props.requestServerKeys(server)
        }
      })

      if (currentServerExpanded && currentServerKeys) {
        serverListItems = [
          ...serverListItems,
          ...this.getServerKeysListItems(key, currentServerKeys,
            (server.advancedSettings && server.advancedSettings.keysFolderSeparator) ||
            defaultServerConfig.KEYS_FOLDER_SEPARATOR)
        ]
      }
    }

    return serverListItems
  }

  getServerKeysListItems (serverKey, keys, separator) {
    let splitKeys = keys.map((key) => ({
      key,
      splitKeys: key.split(separator)
    }))

    let keyTree
    for (let splitKey of splitKeys) {
      keyTree = this.addKeyToTree(keyTree, splitKey.key, splitKeys.splitKeys)
    }

    return this.generateKeyTreeListItems(serverKey, keyTree)
  }

  addKeyToTree (keysTree = {}, key, keyParts) {
    if (!keyParts.length) {
      return
    }

    if (!keysTree.nodes) {
      keysTree.nodes = []
    }

    let pathPart = keysTree.nodes.find(part => part.name === keyParts[0])
    if (!pathPart) {
      pathPart = {
        key: key,
        name: keyParts[0],
        type: keyParts.length > 1
          ? KEY_PATH_TYPE_FOLDER
          : KEY_PATH_TYPE_KEY
      }

      keysTree.nodes.push(pathPart)
    }

    this.addKeyToTree(pathPart, key, keyParts.slice(1))

    return keysTree
  }

  generateKeyTreeListItems (treeNode = {}, serverKey) {
    let nodeKey = serverKey + treeNode.key

    let result = [{
      key: nodeKey,
      treeViewSpans: [
        treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN
      ],
      itemType: keytreetreeViewItemTypes.TREE_VIEW_FOLDER_ITEM,
      name: treeNode.name,
      isExpanded: !!itemsExpandedState[appConstants.ROOT_FOLDER_KEY],
      onToggleExpand: () => this.props.toggleItemExpand(nodeKey)
    }]

    if (treeNode.nodes) {
      result = [
        ...result,
        ...treeNode.nodes.map(node => this.generateKeyTreeListItems(node))
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
