import * as actionTypes from '../constants/actionTypes/index'

export const serverViewWidthChanged = (width) => ({
  type: actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_WIDTH_CHANGED,
  width
})

export const serverViewRequestWidthRestore = () => ({
  type: actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_REQUEST_WIDTH_RESTORE
})

export const serverViewWidthRestoreRequested = () => ({
  type: actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORE_REQUESTED
})

export const serverViewWidthRestored = (width) => ({
  type: actionTypes.mainLayout.MAIN_LAYOUT_SERVER_VIEW_WIDTH_RESTORED,
  width
})
