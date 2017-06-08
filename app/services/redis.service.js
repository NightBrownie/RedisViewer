import Redis from 'ioredis'
import winston from 'winston'

import * as defaultServerConfig from '../constants/defaultServerConfig'

const redisInstances = {}

// TODO: add remove redis server on disconnect to enforce server rewrite after config changes
const getRedisInstance = (serverConfig) => {
  if (!redisInstances[serverConfig.id]) {
    let redis = redisInstances[serverConfig.id] = new Redis({
      host: serverConfig.primarySettings.host || defaultServerConfig.HOST,
      port: serverConfig.primarySettings.port || defaultServerConfig.PORT,
      connectionName: serverConfig.primarySettings.serverName,
      password: serverConfig.primarySettings.password,
      connectTimeout: ((serverConfig.advancedSettings && serverConfig.advancedSettings.connectionTimeout) ||
        defaultServerConfig.CONNECTION_TIMEOUT_SECONDS) * 1000,
      lazyConnect: true
    })

    redis.on('error', (err) => winston.error(err))
  }

  return redisInstances[serverConfig.id]
}

export const getServerKeys = async (server) => {
  let redis = getRedisInstance(server)
  redis.disconnect()
  await redis.connect()
  return redis.keys(server.primarySettings.keysRootPattern || defaultServerConfig.KEYS_ROOT_PATTERN)
}
