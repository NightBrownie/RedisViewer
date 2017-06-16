import Redis from 'ioredis'
import winston from 'winston'

import * as defaultServerConfig from '../constants/defaultServerConfig'

const KEYSPASE_SUBSCRIPTION_STREAM_PREFIX = '__keyspace*__:'

const redisInstances = {}
const redisSubscriptionInstances = {}
const redisServerKeyUpdateCallbacks = {}
const redisServerKeyUpdateSubscribers = {}

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

const getRedisSubscriptionInstance = (serverConfig) => {
  if (!redisSubscriptionInstances[serverConfig.id]) {
    let redis = redisInstances[serverConfig.id] =
      getRedisInstance(serverConfig).duplicate()
    redis.on('error', (err) => winston.error(err))
  }

  return redisSubscriptionInstances[serverConfig.id]
}

const createServerKeyUpdateSubscriber = (server) => {
  return (message) => {
    return 1
  }
}

export const getServerKeys = async (server) => {
  let redis = getRedisInstance(server)
  redis.disconnect()
  await redis.connect()
  return redis.keys(server.primarySettings.keysRootPattern || defaultServerConfig.KEYS_ROOT_PATTERN)
}

export const getKeyData = async (server, key) => {
  let redis = getRedisInstance(server)
  return redis.get(key)
}

export const subscribeForKeyUpdates = async (server, key, callback) => {
  let redis = getRedisSubscriptionInstance(server)
  redis.psubscribe(KEYSPASE_SUBSCRIPTION_STREAM_PREFIX + key)

  if (!redisServerKeyUpdateCallbacks[server.id]) {
    redisServerKeyUpdateCallbacks[server.id] = {}
  }

  if (!redisServerKeyUpdateCallbacks[server.id][key]) {
    redisServerKeyUpdateCallbacks[server.id][key] = []
  }

  if (redisServerKeyUpdateCallbacks[server.id][key].indexOf(callback) > -1) {
    return
  }

  redisServerKeyUpdateCallbacks[key].push(callback)

  if (!redisServerKeyUpdateSubscribers[server.id]) {
    redisServerKeyUpdateSubscribers[server.id] = createServerKeyUpdateSubscriber(server)
    redis.addListener('message', redisServerKeyUpdateSubscribers[server.id])
  }
}

export const unsubscribeFromKeyUpdates = async (server, key, callback) => {
  let redis = getRedisSubscriptionInstance(server)
  redis.punsubscribe(KEYSPASE_SUBSCRIPTION_STREAM_PREFIX + key)
  redis.removeListener('message', callback)
}
