import configService from './config.service'
import configKeys from '../constants/configKeys'

export const getTreeViewSavedWidth =
  async () => configService.getConfigKey(configKeys.SERVER_VIEW_SAVED_WIDTH_KEY)
export const setTreeViewSavedWidth =
  async (width) => configService.setConfigKey(configKeys.SERVER_VIEW_SAVED_WIDTH_KEY, width)

export default {
  getTreeViewSavedWidth,
  setTreeViewSavedWidth
}
