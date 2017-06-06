import { put, takeLatest, call } from 'redux-saga/effects'

import * as actionTypes from '../constants/actionTypes'
import * as serverActions from '../actions/serverActions'
import * as serverConfigService from '../services/serverConfig.service'

function * serverViewRequestServerList () {
  yield put(serverActions.serverListRequested())
}

function * serverViewServerListRequested () {
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.serverListChanged(serverConfigs))
}

function * serverViewSetServer (action) {
  let serverConfig = action.server
  let updatedServer = yield call(serverConfigService.setServer, serverConfig)
  yield put(serverActions.serverChanged(updatedServer))
  let serverConfigs = yield call(serverConfigService.getServer)
  yield put(serverActions.serverListChanged(serverConfigs))
}

export default function * saga () {
  yield [
    takeLatest(actionTypes.SERVER_REQUEST_SERVER_LIST, serverViewRequestServerList),
    takeLatest(actionTypes.SERVER_SERVER_LIST_REQUESTED, serverViewServerListRequested),
    takeLatest(actionTypes.SERVER_SET_SERVER, serverViewSetServer)
  ]
}
