import { put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as actionTypes from '../constants/actionTypes/index'
import * as mainLayoutActions from '../actions/mainLayoutActions'
import * as layoutConfigService from '../services/layoutConfig.service'

function * requestServerViewWidthRestore () {
  yield put(mainLayoutActions.serverViewWidthRestoreRequested())
}

function * restoreTreeViewWidth () {
  let treeViewSavedWidth = yield call(layoutConfigService.getTreeViewSavedWidth)
  yield put(mainLayoutActions.serverViewWidthRestored(treeViewSavedWidth))
}

function * saveTreeViewWidth (action) {
  yield call(delay, 300)
  yield call(layoutConfigService.setTreeViewSavedWidth, action.width)
}

export default function * saga () {
  yield [
    takeLatest(actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_REQUEST_WIDTH_RESTORE, requestServerViewWidthRestore),
    takeLatest(actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORE_REQUESTED, restoreTreeViewWidth),
    takeLatest(actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED, saveTreeViewWidth)
  ]
}
