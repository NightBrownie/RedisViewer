import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import treeViewItemTypes from '../../../constants/treeViewItemType'

export default class ServerListItemIcon extends Component {
  static propTypes = {
    treeViewItemType: PropTypes.oneOf(Object.values(treeViewItemTypes)).isRequired,
    isExpanded: PropTypes.bool.isRequired
  };

  static defaultProps ={
    isExpanded: false
  };

  render () {
    let treeViewItemIconClass = ''
    let treeViewFontAwesomeIconClass = ''
    switch (this.props.treeViewItemType) {
      case treeViewItemTypes.TREE_VIEW_FOLDER_ITEM: {
        treeViewItemIconClass = 'server-list-item-folder-icon'
        if (this.props.isExpanded) {
          treeViewFontAwesomeIconClass = 'fa fa-folder-open-o fa-fw'
        } else {
          treeViewFontAwesomeIconClass = 'fa fa-folder-o fa-fw'
        }
        break
      }
      case treeViewItemTypes.TREE_VIEW_SERVER_ITEM:
        treeViewItemIconClass = 'server-list-item-server-icon'
        treeViewFontAwesomeIconClass = 'fa fa-server fa-fw'
        break
      case treeViewItemTypes.TREE_VIEW_DATABASE_ITEM:
        treeViewItemIconClass = 'server-list-item-database-icon'
        treeViewFontAwesomeIconClass = 'fa fa-database fa-fw'
        break
      case treeViewItemTypes.TREE_VIEW_KEY_ITEM:
        treeViewItemIconClass = 'server-list-item-key-icon'
        treeViewFontAwesomeIconClass = 'fa fa-key fa-fw'
        break
      default:
        break
    }

    return (
      <span className='server-list-item-icon-container'>
        <i
          className={classNames('server-list-item-icon', treeViewFontAwesomeIconClass, treeViewItemIconClass)}
        />
      </span>
    )
  }
}
