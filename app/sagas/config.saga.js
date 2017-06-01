import {put, takeLatest} from "redux-saga/effects";

import * as actionTypes from "../constants/actionTypes";
import * as mainLayoutActions from "../actions/mainLayoutActions";
import * as layoutConfig from "../services/layoutConfig.service";

function* requestServerViewWidthRestore() {
    yield put(mainLayoutActions.serverViewWidthRestoreRequested());
}

function* restoreTreeViewWidth() {
    yield put(mainLayoutActions.serverViewWidthRestored(layoutConfig.getTreeViewSavedWidth()));
}

function* saveTreeViewWidth(action) {
    layoutConfig.setTreeViewSavedWidth(action.width);
}

export default function* saga() {
    yield [
        takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_REQUEST_WIDTH_RESTORE, requestServerViewWidthRestore),
        takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORE_REQUESTED, restoreTreeViewWidth),
        takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED, saveTreeViewWidth)
    ];
}
