import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'

export default class Expander extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {isExpanded: false}
  }

  toggleExpanded () {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  componentDidMount () {
    this.setState({contentHeight: this.expanderContentContainerInner.scrollHeight})
  }

  componentDidUpdate () {
    let updatedContentHeight = this.expanderContentContainerInner.scrollHeight

    if (this.state.contentHeight !== updatedContentHeight) {
      this.setState({contentHeight: updatedContentHeight})
    }
  }

  render () {
    return (<div
      className={classNames('expander',
        this.state.isExpanded && 'expanded',
        this.props.className)
      }
    >
      <span className='expander-header'>
        <button
          ref={(button) => {
            this.expandCollapseButton = button
          }}
          className='expand-collapse-button'
          type='button'
          onClick={() => {
            this.toggleExpanded()
            this.expandCollapseButton && this.expandCollapseButton.blur()
          }}
        >
          {
            this.state.isExpanded
              ? <i className='collapse-icon fa fa-minus-square-o fa-fw' />
              : <i className='expand-icon fa fa-plus-square-o fa-fw' />
          }
        </button>
        <span className='expander-header-empty-space-placeholder' />
        <span
          className='expander-header-label'
          onDoubleClick={() => this.toggleExpanded()}
          title={
            this.state.isExpanded
            ? 'Double click to collapse'
            : 'Double click to expand'
          }
        >
          {this.props.label}
        </span>
        <span className='expander-header-empty-space-placeholder' />
      </span>

      <div
        ref={(elem) => {
          this.expanderContentContainerInner = elem
        }}
        className='expander-content-container'
        style={{
          maxHeight: this.state.isExpanded
            ? this.state.contentHeight
            : 0
        }}
      >
        {this.props.children}
      </div>
    </div>)
  }
}
