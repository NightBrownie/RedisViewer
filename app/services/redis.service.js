import Redis from 'ioredis'
import winston from 'winston'

import * as defaultServerConfig from '../constants/defaultServerConfig'

const KEYSPASE_SUBSCRIPTION_STREAM_PREFIX = '__keyspace*__:'
const SUPPORTED_KEY_UPDATE_EVENTS = ['set', 'incrby']

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
  return async (pattern, channel, message) => {
    console.log(pattern, channel, message)

    // TODO: filter messages

    if (redisServerKeyUpdateCallbacks[server.id]) {
      let subscriptionCallbackKeys = Object.keys(redisServerKeyUpdateCallbacks[server.id])

      if (subscriptionCallbackKeys.length > 0) {
        for (let subscriptionCallbackKey of subscriptionCallbackKeys) {
          if (redisServerKeyUpdateCallbacks[server.id][subscriptionCallbackKey] &&
            redisServerKeyUpdateCallbacks[server.id][subscriptionCallbackKey].length) {
            // get key updated data
            let keyData = await getKeyData(server, subscriptionCallbackKey)

            for (let subscriptionCallback of redisServerKeyUpdateCallbacks[server.id][subscriptionCallbackKey]) {
              subscriptionCallback && subscriptionCallback(keyData)
            }
          }
        }
      }
    }
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

  // register each callback only once
  if (redisServerKeyUpdateCallbacks[server.id][key].indexOf(callback) !== -1) {
    redisServerKeyUpdateCallbacks[key].push(callback)
  }

  // subscribe for key updates one per server
  if (!redisServerKeyUpdateSubscribers[server.id]) {
    redisServerKeyUpdateSubscribers[server.id] = createServerKeyUpdateSubscriber(server)
    redis.addListener('pmessage', redisServerKeyUpdateSubscribers[server.id])
  }
}

export const unsubscribeFromKeyUpdates = async (server, key, callback) => {
  let redis = getRedisSubscriptionInstance(server)
  redis.punsubscribe(KEYSPASE_SUBSCRIPTION_STREAM_PREFIX + key)

  if (redisServerKeyUpdateCallbacks[server.id] && redisServerKeyUpdateCallbacks[server.id][key] &&
    redisServerKeyUpdateCallbacks[server.id][key].indexOf(callback) > -1
  ) {
    // unregister callback
    redisServerKeyUpdateCallbacks[server.id][key] = redisServerKeyUpdateCallbacks[server.id][key]
      .filter(storedCallback => callback !== storedCallback)

    // clean key-specific callback collection
    if (redisServerKeyUpdateCallbacks[server.id][key].length === 0) {
      delete redisServerKeyUpdateCallbacks[server.id][key]
    }

    // clean server-specific callback container
    if (Object.keys(redisServerKeyUpdateCallbacks[server.id]).length === 0) {
      delete redisServerKeyUpdateCallbacks[server.id]
      // unsubscribe from updates for server keys
      redis.removeListener('message', redisServerKeyUpdateSubscribers[server.id])
      delete redisServerKeyUpdateSubscribers[server.id]
    }
  }
}
