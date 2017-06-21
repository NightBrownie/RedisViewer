import { put, takeEvery, call } from 'redux-saga/effects'

import * as actionTypes from '../constants/actionTypes'
import * as keyActions from '../actions/keyActions'
import * as redisService from '../services/redis.service'

function * requestData (action) {
  try {
    let keyData = yield call(redisService.getKeyData, action.server, action.key)
    yield put(keyActions.dataReceived(action.server, action.key, keyData))
  } catch (error) {
    yield put(keyActions.dataRequestFailed(action.server, action.key))
  }
}

function * subscribe (action) {
  try {
    yield call(redisService.subscribeForKeyUpdates, action.server, action.key, () => ({}))
    yield put(keyActions.subscribed(action.server, action.key))
  } catch (error) {
    yield put(keyActions.subscriptionFailed(action.server, action.key))
  }
}

function * unsubscribe (action) {
  try {
    yield call(redisService.unsubscribeFromKeyUpdates, action.server, action.key, () => ({}))
    yield put(keyActions.unsubscribed(action.server, action.key))
  } catch (error) {
    yield put(keyActions.unsubscriptionFailed(action.server, action.key))
  }
}

export default function * saga () {
  yield [
    takeEvery(actionTypes.KEY_REQUEST_DATA, requestData),
    takeEvery(actionTypes.KEY_SUBSCRIBE, subscribe),
    takeEvery(actionTypes.KEY_UNSUBSCRIBE, unsubscribe)
  ]
}
