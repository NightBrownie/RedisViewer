import * as actionTypes from "../constants/actionTypes";

export default function layoutReducer(state = {}, action) {
    switch (action.type) {
        //currently actions have the same semantics
        case actionTypes.TREE_VIEW_WIDTH_CHANGED:
        case actionTypes.TREE_VIEW_WIDTH_RESTORED:
            return {
                ...state,
                treeViewWidth: action.width
            };
        default:
            return state;
    }
};
