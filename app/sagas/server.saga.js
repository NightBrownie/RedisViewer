import { put, takeLatest, takeEvery, call } from 'redux-saga/effects'

import * as redisService from '../services/redis.service'

import * as actionTypes from '../constants/actionTypes/index'
import * as serverActions from '../actions/server'
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
    takeLatest(actionTypes.serverView.SERVER_REQUEST_SERVER_LIST, requestServerList),
    takeLatest(actionTypes.serverView.SERVER_SERVER_LIST_REQUESTED, serverListRequested),
    takeLatest(actionTypes.serverSettings.SERVER_SET_SERVER, setServer),
    takeLatest(actionTypes.serverToolbox.SERVER_REMOVE_SERVER, removeServer),
    takeEvery(actionTypes.serverList.SERVER_REQUEST_KEYS, requestKeys)
  ]
}
