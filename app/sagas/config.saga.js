import { put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import mainLayoutActionTypes from '../constants/actionTypes/mainLayout'

import * as mainLayoutActions from '../actions/mainLayout'

import * as layoutConfigService from '../services/layoutConfig.service'

function * requestServerKeyTreeWidthRestore () {
  yield put(mainLayoutActions.serverViewWidthRestoreRequested())
}

function * restoreServerKeyTreeWidth () {
  let treeViewSavedWidth = yield call(layoutConfigService.getTreeViewSavedWidth)
  yield put(mainLayoutActions.serverViewWidthRestored(treeViewSavedWidth))
}

function * saveServerKeyTreeWidth (action) {
  yield call(delay, 300)
  yield call(layoutConfigService.setTreeViewSavedWidth, action.width)
}

export default function * saga () {
  yield [
    takeLatest(mainLayoutActionTypes.SERVER_KEY_TREE_REQUEST_WIDTH_RESTORE, requestServerKeyTreeWidthRestore),
    takeLatest(mainLayoutActionTypes.SERVER_KEY_TREE_WIDTH_RESTORE_REQUESTED, restoreServerKeyTreeWidth),
    takeLatest(mainLayoutActionTypes.SERVER_KEY_TREE_WIDTH_CHANGED, saveServerKeyTreeWidth)
  ]
}
