import serverKeyTreeActionTypes from '../constants/actionTypes/serverKeyTree'
import serverActionTypes from '../constants/actionTypes/server'
import serverKeyTreeToolBoxActionTypes from '../constants/actionTypes/serverKeyTreeToolBox'
import keyActionTypes from '../constants/actionTypes/key'

import serverTreeViewNodeType from '../constants/serverTreeViewNodeType'
import defaultServerConfig from '../constants/defaultServerConfig'

const defaultState = {
  servers: [],
  itemsExpandedState: {},
  serverKeys: {},
  filteredServerKeys: {},
  loadingServerKeys: {},
  filterTerm: ''
}

const addKeyToTree = (
  keysTree = {
    type: serverTreeViewNodeType.KEY_PATH_NODE_TYPE_SERVER
  },
  key,
  keyParts
) => {
  if (!keyParts.length) {
    return
  }

  if (!keysTree.nodes) {
    keysTree.nodes = []
  }

  let pathPart = keysTree.nodes.find(part => part.name === keyParts[0])
  if (!pathPart) {
    pathPart = {
      key,
      name: keyParts[0],
      type: keyParts.length > 1
        ? serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER
        : serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY
    }

    keysTree.nodes.push(pathPart)
  }

  addKeyToTree(pathPart, key, keyParts.slice(1))

  return keysTree
}

const filterTree = (keyTree, filterTerm) => {
  if (!filterTerm) {
    return keyTree
  }

  if (keyTree.type === serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY) {
    if (keyTree.key.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0) {
      return keyTree
    }
  } else if (keyTree.nodes) {
    if (keyTree.name && keyTree.name.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0) {
      return keyTree
    }

    let innerFilteredTrees = keyTree.nodes
      .filter(node => node)
      .map(innerTree => filterTree(innerTree, filterTerm))
      .filter(filteredTree => filteredTree)

    if (innerFilteredTrees.length) {
      return {
        ...keyTree,
        nodes: innerFilteredTrees
      }
    }
  }
}

const serverListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case serverKeyTreeActionTypes.SERVER_SELECTED:
      return {
        ...state,
        selectedServer: action.server,
        selectedKey: null
      }
    case serverKeyTreeActionTypes.KEY_SELECTED:
      return {
        ...state,
        selectedServer: action.server,
        selectedKey: action.key
      }
    case serverKeyTreeActionTypes.TOGGLE_ITEM_EXPAND:
      return {
        ...state,
        itemsExpandedState: {
          ...state.itemsExpandedState,
          [action.itemKey]: !state.itemsExpandedState[action.itemKey]
        }
      }

    case serverKeyTreeToolBoxActionTypes.FILTER_CHANGED:
      return {
        ...state,
        filterTerm: action.filterTerm,
        filteredServerKeys: Object.keys(state.serverKeys)
          .map((serverId) => ({
            serverId,
            keyTree: filterTree(state.serverKeys[serverId], action.filterTerm)
          }))
          .reduce((accumulator, currentResult) => ({
            ...accumulator,
            [currentResult.serverId]: currentResult.keyTree
          }), {})
      }

    case serverActionTypes.SAVED:
      return {
        ...state,
        selectedServer: state.selectedServer && state.selectedServer.id === action.server.id
          ? action.server
          : state.selectedServer
      }
    case serverActionTypes.REMOVED:
      return {
        ...state,
        selectedServer: state.selectedServer && state.selectedServer.id === action.server.id
          ? null
          : state.selectedServer,
        selectedKey: state.selectedServer && state.selectedServer.id === action.server.id
          ? null
          : state.selectedKey
      }
    case serverActionTypes.LIST_CHANGED:
      return {
        ...state,
        servers: action.servers
      }

    case keyActionTypes.LOAD_KEYS:
      return {
        ...state,
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: true
        }
      }
    case keyActionTypes.KEYS_LOAD_FAILED:
      return {
        ...state,
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: false
        }
      }
    case keyActionTypes.KEYS_LOADED:
      let separator = (action.server.advancedSettings && action.server.advancedSettings.keysFolderSeparator) ||
        defaultServerConfig.KEYS_FOLDER_SEPARATOR

      let splitKeys = action.keys
        .sort()
        .map((key) => ({
          key,
          splitKeys: key.split(separator)
        }))

      let keyTree
      for (let splitKey of splitKeys) {
        keyTree = addKeyToTree(keyTree, splitKey.key, splitKey.splitKeys)
      }

      return {
        ...state,
        serverKeys: {
          ...state.serverKeys,
          [action.server.id]: keyTree
        },
        filteredServerKeys: {
          ...state.filteredServerKeys,
          [action.server.id]: filterTree(keyTree, state.filterTerm)
        },
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: false
        }
      }

    default:
      return state
  }
}

export default serverListReducer
