import actionTypes from '../constants/actionTypes/mainLayout'

export const serverViewWidthChanged = (width) => ({
  type: actionTypes.SERVER_KEY_TREE_WIDTH_CHANGED,
  width
})

export const serverViewRequestWidthRestore = () => ({
  type: actionTypes.SERVER_KEY_TREE_REQUEST_WIDTH_RESTORE
})

export const serverViewWidthRestoreRequested = () => ({
  type: actionTypes.SERVER_KEY_TREE_WIDTH_RESTORE_REQUESTED
})

export const serverViewWidthRestored = (width) => ({
  type: actionTypes.SERVER_KEY_TREE_WIDTH_RESTORED,
  width
})

export default {
  serverViewWidthChanged,
  serverViewRequestWidthRestore,
  serverViewWidthRestoreRequested,
  serverViewWidthRestored
}
