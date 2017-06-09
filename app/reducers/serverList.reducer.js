import * as actionTypes from '../constants/actionTypes'
import * as defaultServerConfig from '../constants/defaultServerConfig'
import * as serverTreeViewNodeType from '../constants/serverTreeViewNodeType'

const defaultState = {
  servers: [],
  itemsExpandedState: {},
  serverKeys: {},
  loadingServerKeys: {}
}

const addKeyToTree = (
  keysTree = {
    type: serverTreeViewNodeType.KEY_PATH_NODE_TYPE_SERVER
  },
  key,
  keyParts) => {
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
        ? serverTreeViewNodeType.KEY_PATH_NODE_TYPE_FOLDER
        : serverTreeViewNodeType.KEY_PATH_NODE_TYPE_KEY
    }

    keysTree.nodes.push(pathPart)
  }

  addKeyToTree(pathPart, key, keyParts.slice(1))

  return keysTree
}

const serverListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SERVER_SERVER_SELECTED:
      return {
        ...state,
        selectedServer: action.server
      }
    case actionTypes.SERVER_SERVER_REMOVED:
      return {
        ...state,
        selectedServer: null
      }
    case actionTypes.SERVER_SERVER_LIST_CHANGED:
      return {
        ...state,
        servers: action.servers
      }
    case actionTypes.SERVER_TOGGLE_SERVER_LIST_ITEM_EXPAND:
      return {
        ...state,
        itemsExpandedState: {
          ...state.itemsExpandedState,
          [action.itemKey]: !state.itemsExpandedState[action.itemKey]
        }
      }
    case actionTypes.SERVER_REQUEST_KEYS:
      return {
        ...state,
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: true
        }
      }
    case actionTypes.SERVER_KEYS_LOAD_FAILED:
      return {
        ...state,
        loadingServerKeys: {
          ...state.loadingServerKeys,
          [action.server.id]: false
        }
      }
    case actionTypes.SERVER_KEYS_LOADED:
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
