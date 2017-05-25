import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes';

export default class TreeViewSpan extends Component {
    static propTypes = {
        spanType: PropTypes.oneOf(Object.values(treeViewSpanTypes)).isRequired,
        isExpandable: PropTypes.bool.isRequired,
        isExpanded: PropTypes.bool.isRequired
    };

    static defaultProps = {
        spanType: treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
        isExpandable: false,
        isExpanded: false
    };

    render() {
        let treeViewItemSpanClass = '';

        switch (this.props.spanType) {
            case treeViewSpanTypes.TREE_VIEW_NODELESS_SPAN:
                treeViewItemSpanClass = 'nodeless-tree-view-span';
                break;
            case treeViewSpanTypes.TREE_VIEW_NODE_SPAN:
                treeViewItemSpanClass = 'node-tree-view-span';
                break;
            case treeViewSpanTypes.TREE_VIEW_LAST_NODE_SPAN:
                treeViewItemSpanClass = 'last-node-tree-view-span';
                break;
            default:
                break;
        }

        if (this.props.isExpandable) {
            return (<span className="tree-view-span-container">
              <span className={classNames('tree-view-span', treeViewItemSpanClass)}>
                <span
                  className={this.props.isExpanded
                            ? 'tree-view-expander-open fa fa-minus-square-o'
                            : 'tree-view-expander-closed fa fa-plus-square-o'}
                />
              </span>
            </span>);
        }

        return (<span className="tree-view-span-container">
          <span className={classNames('tree-view-span', treeViewItemSpanClass)} />
        </span>);
    }
}
