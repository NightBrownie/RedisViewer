import { put, takeEvery, take, call, fork } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga'

import keyActionTypes from '../constants/actionTypes/key'

import keyActions from '../actions/key'

import * as redisService from '../services/redis.service'

const serverKeyUpdateSubscriptionChannels = {}

function createKeySubscriptionChannel (server, key) {
  return eventChannel(
    emitter => {
      redisService.subscribeForKeyUpdates(server, key, emitter)
      return () => redisService.unsubscribeFromKeyUpdates(server, key, emitter)
    }, // Sliding buffer will result in processing of only newest updates, replace with buffers.expanding(1) if needed
    buffers.sliding(1)
  )
}

function * requestData (action) {
  try {
    let keyData = yield call(redisService.getKeyData, action.server, action.key)
    yield put(keyActions.dataReceived(action.server, action.key, keyData))
  } catch (error) {
    yield put(keyActions.dataRequestFailed(action.server, action.key))
  }
}

function * processKeyDataUpdates (server, key, channel) {
  while (true) {
    const keyData = yield take(channel)
    yield put(keyActions.dataReceived(server, key, keyData))
  }
}

function * subscribe (action) {
  try {
    if (!serverKeyUpdateSubscriptionChannels[action.server.id]) {
      serverKeyUpdateSubscriptionChannels[action.server.id] = {}
    }

    if (!serverKeyUpdateSubscriptionChannels[action.server.id][action.key]) {
      const channel = serverKeyUpdateSubscriptionChannels[action.server.id][action.key] =
        createKeySubscriptionChannel(action.server, action.key)
      yield fork(processKeyDataUpdates, action.server, action.key, channel)
    }

    yield put(keyActions.subscribed(action.server, action.key))
  } catch (error) {
    yield put(keyActions.subscriptionFailed(action.server, action.key))
  }
}

function * unsubscribe (action) {
  try {
    if (serverKeyUpdateSubscriptionChannels[action.server.id] &&
      serverKeyUpdateSubscriptionChannels[action.server.id][action.key]
    ) {
      serverKeyUpdateSubscriptionChannels[action.server.id][action.key].close()
      delete serverKeyUpdateSubscriptionChannels[action.server.id][action.key]

      if (!Object.keys(serverKeyUpdateSubscriptionChannels[action.server.id]).length) {
        delete serverKeyUpdateSubscriptionChannels[action.server.id]
      }

      yield put(keyActions.unsubscribed(action.server, action.key))
    }
  } catch (error) {
    yield put(keyActions.unsubscriptionFailed(action.server, action.key))
  }
}

function * loadKeys (action) {
  try {
    let loadedKeys = yield call(redisService.getServerKeys, action.server)
    yield put(keyActions.keysLoaded(action.server, loadedKeys))
  } catch (error) {
    yield put(keyActions.keysLoadFailed(action.server, error))
  }
}

export default function * saga () {
  yield [
    takeEvery(keyActionTypes.REQUEST_DATA, requestData),
    takeEvery(keyActionTypes.SUBSCRIBE, subscribe),
    takeEvery(keyActionTypes.UNSUBSCRIBE, unsubscribe),
    takeEvery(keyActionTypes.LOAD_KEYS, loadKeys)
  ]
}
