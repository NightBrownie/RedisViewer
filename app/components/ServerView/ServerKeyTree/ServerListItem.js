import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import treeViewSpanTypes from '../../../constants/treeViewSpanType'
import treeViewItemTypes from '../../../constants/treeViewItemType'

import TreeViewSpan from './TreeViewSpan'
import ServerListItemIcon from './ServerListItemIcon'
import OptionsButton from '../../OptionsButton'

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
    name: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    treeViewSpans: treeViewSpanTypes.TREE_VIEW_EMPTY_SPAN,
    isExpanded: false,
    isSelected: false,
    name: ''
  }

  render () {
    const spanTypes = this.props.treeViewSpans.length !== undefined
            ? this.props.treeViewSpans
            : [this.props.treeViewSpans]
    const isExpandable = this.props.itemType !== treeViewItemTypes.TREE_VIEW_KEY_ITEM

    return (
      <li
        className={classNames(
          'server-list-item',
          this.props.isSelected
            ? 'selected'
            : ''
        )}
        title={this.props.title}
        tabIndex={0}
        onClick={() => this.props.onSelected && this.props.onSelected()}
        onDoubleClick={() => isExpandable && this.props.onToggleExpand()}
      >
        {spanTypes.map((spanType, spanTypeIndex) => (
          <TreeViewSpan
            // eslint-disable-next-line react/no-array-index-key
            key={spanType + spanTypeIndex}
            spanType={spanType}
            isExpandable={isExpandable && (spanTypeIndex === spanTypes.length - 1)}
            isExpanded={this.props.isExpanded}
            onToggleExpand={this.props.onToggleExpand}
          />
        ))}

        <ServerListItemIcon
          treeViewItemType={this.props.itemType}
          isExpanded={this.props.isExpanded}
        />

        <span className='server-list-item-name'>
          <span className='server-list-item-name-text'>
            {this.props.name}
          </span>
        </span>

        <span className='options-button-container'>
          <OptionsButton />
        </span>
      </li>
    )
  }
}
