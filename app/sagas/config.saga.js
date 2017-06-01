import { put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as actionTypes from '../constants/actionTypes'
import * as mainLayoutActions from '../actions/mainLayoutActions'
import * as layoutConfig from '../services/layoutConfig.service'

function * requestServerViewWidthRestore () {
  yield put(mainLayoutActions.serverViewWidthRestoreRequested())
}

function * restoreTreeViewWidth () {
  let treeViewSavedWidth = yield call(layoutConfig.getTreeViewSavedWidth)
  yield put(mainLayoutActions.serverViewWidthRestored(treeViewSavedWidth))
}

function * saveTreeViewWidth (action) {
  yield call(delay, 300)
  yield call(layoutConfig.setTreeViewSavedWidth, action.width)
}

export default function * saga () {
  yield [
    takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_REQUEST_WIDTH_RESTORE, requestServerViewWidthRestore),
    takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORE_REQUESTED, restoreTreeViewWidth),
    takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED, saveTreeViewWidth)
  ]
}
