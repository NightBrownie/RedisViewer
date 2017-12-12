import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Button from './controls/Button'

export default class OptionsButton extends Component {
  static propTypes = {
    isInactiveTransparentBorder: PropTypes.bool
  };

  static defaultProps = {
    isInactiveTransparentBorder: true
  };

  render () {
    return (
      <Button
        className={classNames(this.props.className, 'options-button')}
        isInactiveTransparentBorder={this.props.isInactiveTransparentBorder}
      >
        <i className='options-button-icon fa fa-ellipsis-v fa-fw fa-lg' />
        {this.props.children}
      </Button>
    )
  }
}
