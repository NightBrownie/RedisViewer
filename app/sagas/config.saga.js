import {put, takeLatest} from "redux-saga/effects";

import * as actionTypes from "../constants/actionTypes";
import {treeViewWidthRestored} from "../actions/configActions";
import * as layoutConfig from "../services/layoutConfig.service";

function* restoreTreeViewWidth() {
    yield put(treeViewWidthRestored(layoutConfig.getTreeViewSavedWidth()));
}

function* saveTreeViewWidth(action) {
    layoutConfig.setTreeViewSavedWidth(action.width);
}

export default function* saga() {
    yield [
        takeLatest(actionTypes.TREE_VIEW_WIDTH_RESTORE_REQUESTED, restoreTreeViewWidth),
        takeLatest(actionTypes.TREE_VIEW_WIDTH_CHANGED, saveTreeViewWidth)
    ];
}
