import React, { Component, PropTypes } from 'react';

import ServerListItem from './serverListItem';

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes';
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes';

export default class ServerList extends Component {
    render() {
        return (<div className="server-list-container">
          <ul className="server-list">
            <ServerListItem
              treeViewSpans={[treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN]}
              isExpandable
              isExpanded={false}
              itemType={treeViewItemTypes.TREE_VIEW_FOLDER_ITEM}
              name={'Test folder name'}
            />
            <ServerListItem
              treeViewSpans={[treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN]}
              isExpandable
              isExpanded
              itemType={treeViewItemTypes.TREE_VIEW_FOLDER_ITEM}
              name={'Test folder name'}
            />
            <ServerListItem
              treeViewSpans={[treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN]}
              itemType={treeViewItemTypes.TREE_VIEW_SERVER_ITEM}
              name={'Test folder name'}
            />
            <ServerListItem
              treeViewSpans={[treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN]}
              itemType={treeViewItemTypes.TREE_VIEW_DATABASE_ITEM}
              name={'Test folder name'}
            />
            <ServerListItem
              treeViewSpans={[treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN]}
              itemType={treeViewItemTypes.TREE_VIEW_KEY_ITEM}
              name={'Test folder name'}
            />
          </ul>
        </div>);
    }
}
