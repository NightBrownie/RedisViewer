import React, { Component, PropTypes } from 'react';

export default class ServerListItem extends Component {
    static propTypes = {
        treeViewSpans: PropTypes.array.isRequired,

    }

    render() {
        return (<li className="server-list-item" tabIndex={0}>
          <span className="tree-view-span-container">
            <span className="tree-view-span nodeless-tree-view-span" />
            <span className="tree-view-span node-tree-view-span">
              <span className="tree-view-expander-closed fa fa-plus-square-o" />
            </span>
            <span className="tree-view-span last-node-tree-view-span">
              <span className="tree-view-expander-open fa fa-minus-square-o" />
            </span>
            <span className="tree-view-span" />
          </span>
          <span
            className="tree-view-item-icon tree-view-folder-icon tree-view-server-icon tree-view-database-icon tree-view-key-icon"
          >
            <span className="fa fa-folder-o fa-fw" />
            <span className="fa fa-folder-open-o fa-fw" />
            <span className="fa fa-server fa-fw" />
            <span className="fa fa-database fa-fw" />
            <span className="fa fa-key" />
          </span>
        </li>);
    }
}
