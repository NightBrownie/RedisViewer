import { put, takeLatest, call } from 'redux-saga/effects'

import serverActionTypes from '../constants/actionTypes/server'

import serverActions from '../actions/server'

import serverConfigService from '../services/serverConfig'

function * requestServerList () {
  yield put(serverActions.listRequested())
}

function * serverListRequested () {
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.listChanged(serverConfigs))
}

function * saveServer (action) {
  try {
    let updatedServer = yield call(serverConfigService.setServer, action.server)
    yield put(serverActions.saved(updatedServer))
    let serverConfigs = yield call(serverConfigService.getServer)
    yield put(serverActions.listChanged(serverConfigs))
  } catch (error) {
    yield put(serverActions.saveFailed(action.server))
  }
}

function * removeServer (action) {
  let serverConfig = action.server
  yield call(serverConfigService.removeServer, serverConfig)
  yield put(serverActions.removed(serverConfig))
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.listChanged(serverConfigs))
}

export default function * saga () {
  yield [
    takeLatest(serverActionTypes.REQUEST_LIST, requestServerList),
    takeLatest(serverActionTypes.LIST_REQUESTED, serverListRequested),
    takeLatest(serverActionTypes.SAVE, saveServer),
    takeLatest(serverActionTypes.REMOVE, removeServer)
  ]
}
