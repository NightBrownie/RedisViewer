import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import * as treeViewItemTypes from '../../../constants/treeViewItemTypes';

export default class ServerListItemIcon extends Component {
    static propTypes = {
        treeViewItemType: PropTypes.oneOf(Object.values(treeViewItemTypes)).isRequired,
        isExpanded: PropTypes.bool.isRequired
    };

    static defaultProps ={
        isExpanded: false
    };

    render() {
        let treeViewItemIconClass = '';
        let treeViewFontAwesomeIconClass = '';
        switch (this.props.treeViewItemType) {
            case treeViewItemTypes.TREE_VIEW_FOLDER_ITEM: {
                treeViewItemIconClass = 'tree-view-folder-icon';
                if (this.props.isExpanded) {
                    treeViewFontAwesomeIconClass = 'fa fa-folder-open-o fa-fw';
                } else {
                    treeViewFontAwesomeIconClass = 'fa fa-folder-o fa-fw';
                }
                break;
            }
            case treeViewItemTypes.TREE_VIEW_SERVER_ITEM:
                treeViewItemIconClass = 'tree-view-server-icon';
                treeViewFontAwesomeIconClass = 'fa fa-server fa-fw';
                break;
            case treeViewItemTypes.TREE_VIEW_DATABASE_ITEM:
                treeViewItemIconClass = 'tree-view-database-icon';
                treeViewFontAwesomeIconClass = 'fa fa-database fa-fw';
                break;
            case treeViewItemTypes.TREE_VIEW_KEY_ITEM:
                treeViewItemIconClass = 'tree-view-key-icon';
                treeViewFontAwesomeIconClass = 'fa fa-key fa-fw';
                break;
            default:
                break;
        }

        return (<span className={classNames('tree-view-item-icon', treeViewItemIconClass)}>
          <span className={treeViewFontAwesomeIconClass} />
        </span>);
    }
}
