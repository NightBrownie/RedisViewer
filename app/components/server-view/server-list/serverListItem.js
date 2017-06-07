import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import * as treeViewSpanTypes from '../../../constants/treeViewSpanTypes'
import * as treeViewItemTypes from '../../../constants/treeViewItemTypes'

import TreeViewSpan from './treeViewSpan'
import ServerListItemIcon from './serverListItemIcon'
import OptionsButton from '../../optionsButton'

export default class ServerListItem extends Component {
    static propTypes = {
      treeViewSpans: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOf(Object.values(treeViewSpanTypes))),
        PropTypes.oneOf(Object.values(treeViewSpanTypes))
      ]).isRequired,
      isExpanded: PropTypes.bool.isRequired,
      onToggleExpand: PropTypes.func,
      onSelected: PropTypes.func,
      isSelected: PropTypes.bool,
      itemType: PropTypes.oneOf(Object.values(treeViewItemTypes)).isRequired,
      name: PropTypes.string
    }

    static defaultProps = {
      treeViewSpans: treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
      isExpandable: false,
      isExpanded: false,
      isSelected: false,
      name: ''
    }

    render () {
        const spanTypes = this.props.treeViewSpans.length !== undefined
            ? this.props.treeViewSpans
            : [this.props.treeViewSpans]

        return (<li
          className={classNames(
            'server-list-item',
            this.props.isSelected
              ? 'selected'
              : ''
          )}
          tabIndex={0}
          onClick={() => this.props.onSelected && this.props.onSelected()}
        >
            { spanTypes.map((spanType, spanTypeIndex) => (
                <TreeViewSpan
                    // eslint-disable-next-line react/no-array-index-key
                    key={spanType + spanTypeIndex}
                    spanType={spanType}
                    isExpandable={
                        this.props.itemType !== treeViewItemTypes.TREE_VIEW_KEY_ITEM
                        && (spanTypeIndex === spanTypes.length - 1)
                    }
                    isExpanded={this.props.isExpanded}
                    onToggleExpand={this.props.onToggleExpand}
                />
            )) }

            <ServerListItemIcon
                treeViewItemType={this.props.itemType}
                isExpanded={this.props.isExpanded}
            />

            <span className="server-list-item-name">
            <span className="server-list-item-name-text">
              { this.props.name }
            </span>
          </span>

            <span className="options-button-container">
            <OptionsButton />
          </span>
        </li>)
    }
}
