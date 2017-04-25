import * as types from "../constants/actionTypes"

export const treeViewWidthChanged = (width) => ({
    type: types.TREE_VIEW_WIDTH_CHANGED,
    width
});

export const treeViewWidthRestoreRequested = () => ({
    type: types.TREE_VIEW_WIDTH_RESTORE_REQUESTED
});

export const treeViewWidthRestored = (width) => ({
    type: types.TREE_VIEW_WIDTH_RESTORED,
    width
});
