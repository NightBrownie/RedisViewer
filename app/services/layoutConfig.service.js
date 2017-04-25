import * as configService from "./config.service";
import * as configKeys from "../constants/configKeys";

export const getTreeViewSavedWidth = () => configService.getConfigKey(configKeys.TREE_VIEW_SAVED_WIDTH_KEY);
export const setTreeViewSavedWidth = (width) => configService.setConfigKey(configKeys.TREE_VIEW_SAVED_WIDTH_KEY, width);
