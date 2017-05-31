import {put, takeLatest} from "redux-saga/effects";

import * as actionTypes from "../constants/actionTypes";
import {serverViewWidthRestored} from "../actions/mainLayoutActions";
import * as layoutConfig from "../services/layoutConfig.service";

function* restoreTreeViewWidth() {
    yield put(serverViewWidthRestored(layoutConfig.getTreeViewSavedWidth()));
}

function* saveTreeViewWidth(action) {
    layoutConfig.setTreeViewSavedWidth(action.width);
}

export default function* saga() {
    yield [
        takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORE_REQUESTED, restoreTreeViewWidth),
        takeLatest(actionTypes.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED, saveTreeViewWidth)
    ];
}
