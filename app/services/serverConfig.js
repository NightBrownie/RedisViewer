import uuid from 'uuid/v4'

import configService from './config'

import configKeys from '../constants/configKeys'
import appConstants from '../constants/appConstants'

export const getServer = async (id) => {
  let savedServerConfigs = await configService.getConfigKey(configKeys.SERVER_CONFIG_LIST,
    appConstants.DEFAULT_SERVER_CONFIG_LIST)

  if (id) {
    return savedServerConfigs
      .find((config) => config.id === id)
  }

  return savedServerConfigs
}

export const setServer = async (server) => {
  let serverConfig = server

  if (!serverConfig.id) {
    serverConfig.id = uuid()
  }

  let savedServerConfigs = await configService.getConfigKey(configKeys.SERVER_CONFIG_LIST,
    appConstants.DEFAULT_SERVER_CONFIG_LIST)

  let serverConfigUpdateIndex = savedServerConfigs
    .findIndex(savedConfig => savedConfig.id === serverConfig.id)

  let updatedServerConfigs
  if (serverConfigUpdateIndex >= 0) {
    updatedServerConfigs = [
      ...savedServerConfigs.slice(0, serverConfigUpdateIndex),
      serverConfig,
      ...savedServerConfigs.slice(serverConfigUpdateIndex + 1)
    ]
  } else {
    updatedServerConfigs = [
      ...savedServerConfigs.filter(savedConfig => savedConfig.id !== serverConfig.id),
      serverConfig
    ]
  }

  await configService.setConfigKey(configKeys.SERVER_CONFIG_LIST, updatedServerConfigs)

  return serverConfig
}

export const removeServer = async (server) => {
  let savedServerConfigs = await configService.getConfigKey(configKeys.SERVER_CONFIG_LIST,
    appConstants.DEFAULT_SERVER_CONFIG_LIST)
  await configService.setConfigKey(configKeys.SERVER_CONFIG_LIST,
    savedServerConfigs.filter(serverConfig => serverConfig.id !== server.id))
}

export default {
  getServer,
  setServer,
  removeServer
}
