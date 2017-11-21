import { put, takeLatest, takeEvery, call } from 'redux-saga/effects'

import serverActionTypes from '../constants/actionTypes/server'
import keyActionTypes from '../constants/actionTypes/key'

import serverActions from '../actions/server'

import * as redisService from '../services/redis.service'
import * as serverConfigService from '../services/serverConfig.service'

function * requestServerList () {
  yield put(serverActions.serverListRequested())
}

function * serverListRequested () {
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.listChanged(serverConfigs))
}

function * saveServer (action) {
  let serverConfig = action.server
  let updatedServer = yield call(serverConfigService.setServer, serverConfig)
  yield put(serverActions.saved(updatedServer))
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.listChanged(serverConfigs))
}

function * removeServer (action) {
  let serverConfig = action.server
  yield call(serverConfigService.removeServer, serverConfig)
  yield put(serverActions.removed(serverConfig))
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.listChanged(serverConfigs))
}

function * loadKeys (action) {
  try {
    let loadedKeys = yield call(redisService.getServerKeys, action.server)
    yield put(serverActions.keysLoaded(action.server, loadedKeys))
  } catch (error) {
    yield put(serverActions.keysLoadFailed(action.server, error))
  }
}

export default function * saga () {
  yield [
    takeLatest(serverActionTypes.REQUEST_LIST, requestServerList),
    takeLatest(serverActionTypes.LIST_REQUESTED, serverListRequested),
    takeLatest(serverActionTypes.SAVE, saveServer),
    takeLatest(serverActionTypes.REMOVE, removeServer),
    takeEvery(keyActionTypes.LOAD_KEYS, loadKeys)
  ]
}
