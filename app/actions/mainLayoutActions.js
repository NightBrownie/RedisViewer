import * as types from '../constants/actionTypes';

export const serverViewWidthChanged = (width) => ({
    type: types.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED,
    width
});

export const serverViewRequestWidthRestore = () => ({
    type: types.MAIN_LAYOUT_SERVER_VIEW_REQUEST_WIDTH_RESTORE
});

export const serverViewWidthRestoreRequested = () => ({
    type: types.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORE_REQUESTED
});

export const serverViewWidthRestored = (width) => ({
    type: types.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORED,
    width
});
