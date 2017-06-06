import { put, takeLatest, call } from 'redux-saga/effects'

import * as actionTypes from '../constants/actionTypes'
import * as serverViewActions from '../actions/serverViewActions'

function * serverViewRequestServerList () {
  yield put(serverViewActions.serverListRequested())
}

function * serverViewServerListRequested () {
  //TODO: call the service and retvieve the whole servers list
  yield put(serverViewActions.serverListChanged([]))
}

export default function * saga () {
  yield [
    takeLatest(actionTypes.SERVER_VIEW_REQUEST_SERVER_LIST, serverViewRequestServerList),
    takeLatest(actionTypes.SERVER_VIEW_SERVER_LIST_REQUESTED, serverViewServerListRequested)
  ]
}
