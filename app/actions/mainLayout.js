import * as actionTypes from '../constants/actionTypes/mainLayout'

export const serverViewWidthChanged = (width) => ({
  type: actionTypes.SERVER_KEY_TREE_VIEW_WIDTH_CHANGED,
  width
})

export const serverViewRequestWidthRestore = () => ({
  type: actionTypes.SERVER_KEY_TREE_VIEW_REQUEST_WIDTH_RESTORE
})

export const serverViewWidthRestoreRequested = () => ({
  type: actionTypes.SERVER_KEY_TREE_VIEW_WIDTH_RESTORE_REQUESTED
})

export const serverViewWidthRestored = (width) => ({
  type: actionTypes.SERVER_KEY_TREE_VIEW_WIDTH_RESTORED,
  width
})
