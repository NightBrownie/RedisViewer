import Redis from 'ioredis'
import winston from 'winston'

import * as defaultServerConfig from '../constants/defaultServerConfig'

const REDIS_SUBSCRIPTION_UPDATE_EVENT = 'pmessage'
const KEYSPASE_SUBSCRIPTION_STREAM_PREFIX = '__keyspace*__:'
const SUPPORTED_KEY_UPDATE_EVENTS = ['set', 'incrby']

const redisInstances = {}
const redisSubscriptionInstances = {}
const redisServerKeyUpdateCallbacks = {}
const redisServerKeyUpdateSubscribers = {}
const redisServerKeyUpdatePatternKeys = {}

// TODO: add remove redis server on disconnect to enforce server rewrite after config changes
const getRedisInstance = (serverConfig) => {
  if (!redisInstances[serverConfig.id]) {
    let redis = redisInstances[serverConfig.id] = new Redis({
      host: serverConfig.primarySettings.host || defaultServerConfig.HOST,
      port: serverConfig.primarySettings.port || defaultServerConfig.PORT,
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
    let redis = redisSubscriptionInstances[serverConfig.id] =
      getRedisInstance(serverConfig).duplicate()
    redis.on('error', (err) => winston.error(err))
  }

  return redisSubscriptionInstances[serverConfig.id]
}

const getKeySubscriptionPattern = key => KEYSPASE_SUBSCRIPTION_STREAM_PREFIX + key

const createServerKeyUpdateSubscriber = (server) => {
  return async (pattern, channel, message) => {
    if (SUPPORTED_KEY_UPDATE_EVENTS.indexOf(message) < 0) {
      return
    }

    if (redisServerKeyUpdateCallbacks[server.id]) {
      if (redisServerKeyUpdateCallbacks[server.id][pattern] &&
        redisServerKeyUpdateCallbacks[server.id][pattern].length
      ) {
        let subscriptionCallbackKey = redisServerKeyUpdatePatternKeys[pattern]

        // get key updated data
        let keyData = await getKeyData(server, subscriptionCallbackKey)

        for (let subscriptionCallback of redisServerKeyUpdateCallbacks[server.id][pattern]) {
          subscriptionCallback && subscriptionCallback(keyData)
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

export const subscribeForKeyUpdates = (server, key, callback) => {
  if (!redisServerKeyUpdateCallbacks[server.id]) {
    redisServerKeyUpdateCallbacks[server.id] = {}
  }

  let subscriptionPattern = getKeySubscriptionPattern(key)
  if (!redisServerKeyUpdateCallbacks[server.id][subscriptionPattern]) {
    redisServerKeyUpdateCallbacks[server.id][subscriptionPattern] = []
    redisServerKeyUpdatePatternKeys[subscriptionPattern] = key
  }

  // register each callback only once
  if (!redisServerKeyUpdateCallbacks[server.id][subscriptionPattern].includes(callback)) {
    redisServerKeyUpdateCallbacks[server.id][subscriptionPattern].push(callback)
  }

  let redis = getRedisSubscriptionInstance(server)

  // subscribe for key updates once per server
  if (!redisServerKeyUpdateSubscribers[server.id]) {
    redisServerKeyUpdateSubscribers[server.id] = createServerKeyUpdateSubscriber(server)
    redis.addListener(REDIS_SUBSCRIPTION_UPDATE_EVENT, redisServerKeyUpdateSubscribers[server.id])
  }

  redis.psubscribe(subscriptionPattern)
}

export const unsubscribeFromKeyUpdates = (server, key, callback) => {
  let subscriptionPattern = getKeySubscriptionPattern(key)

  let redis = getRedisSubscriptionInstance(server)
  redis.punsubscribe(subscriptionPattern)

  if (redisServerKeyUpdateCallbacks[server.id] &&
    redisServerKeyUpdateCallbacks[server.id][subscriptionPattern] &&
    redisServerKeyUpdateCallbacks[server.id][subscriptionPattern].includes(callback)
  ) {
    // unregister callback
    redisServerKeyUpdateCallbacks[server.id][subscriptionPattern] =
      redisServerKeyUpdateCallbacks[server.id][subscriptionPattern]
        .filter(storedCallback => storedCallback !== callback)

    // clean key-specific callback collection
    if (redisServerKeyUpdateCallbacks[server.id][subscriptionPattern].length === 0) {
      delete redisServerKeyUpdateCallbacks[server.id][subscriptionPattern]
      delete redisServerKeyUpdatePatternKeys[subscriptionPattern]
    }

    // clean server-specific callback container
    if (Object.keys(redisServerKeyUpdateCallbacks[server.id]).length === 0) {
      delete redisServerKeyUpdateCallbacks[server.id]
      // unsubscribe from updates for server keys
      redis.removeListener(REDIS_SUBSCRIPTION_UPDATE_EVENT, redisServerKeyUpdateSubscribers[server.id])
      delete redisServerKeyUpdateSubscribers[server.id]
    }
  }
}
