import { put, takeLatest, takeEvery, call } from 'redux-saga/effects'

import * as redisService from '../services/redis.service'

import * as actionTypes from '../constants/actionTypes'
import * as serverActions from '../actions/serverActions'
import * as serverConfigService from '../services/serverConfig.service'

function * requestServerList () {
  yield put(serverActions.serverListRequested())
}

function * serverListRequested () {
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.serverListChanged(serverConfigs))
}

function * setServer (action) {
  let serverConfig = action.server
  let updatedServer = yield call(serverConfigService.setServer, serverConfig)
  yield put(serverActions.serverSaved(updatedServer))
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.serverListChanged(serverConfigs))
}

function * removeServer (action) {
  let serverConfig = action.server
  yield call(serverConfigService.removeServer, serverConfig)
  yield put(serverActions.serverRemoved(serverConfig))
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.serverListChanged(serverConfigs))
}

function * requestKeys (action) {
  try {
    let loadedKeys = yield call(redisService.getServerKeys, action.server)
    yield put(serverActions.keysLoaded(action.server, loadedKeys))
  } catch (error) {
    yield put(serverActions.keysLoadFailed(action.server, error))
  }
}

export default function * saga () {
  yield [
    takeLatest(actionTypes.SERVER_REQUEST_SERVER_LIST, requestServerList),
    takeLatest(actionTypes.SERVER_SERVER_LIST_REQUESTED, serverListRequested),
    takeLatest(actionTypes.SERVER_SET_SERVER, setServer),
    takeLatest(actionTypes.SERVER_REMOVE_SERVER, removeServer),
    takeEvery(actionTypes.SERVER_REQUEST_KEYS, requestKeys)
  ]
}
