import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import * as routes from '../../constants/routes'
import * as keyContentType from '../../constants/keyContentType'

export default class KeyView extends Component {
  static propTypes = {
    shouldRedirectToTheRoot: PropTypes.bool,
    server: PropTypes.object,
    keyName: PropTypes.string
  }

  static defaultProps = {
    shouldRedirectToTheRoot: false
  }

  constructor (props) {
    super(props)

    this.state = {
      keyDisplayType: keyContentType.PLAIN_TEXT
    }
  }

  render () {
    if (this.props.shouldRedirectToTheRoot) {
      return (
        <Redirect to={routes.ROOT}/>
      )
    }

    return (<div
      className='key-view-container'
    >
      <h3 className='key-name'>
        <span className='key-name-label'>
          Key:
        </span>
        <span className='key-name-text'>
          {this.props.keyName}
        </span>
      </h3>

      <div className='key-content'>
        test key content
      </div>

      <div className='key-settings'>
        <span className='key-display-type'>
          <span className='display-type-label'>
            Display as
          </span>
          <select
            className='key-display-type-select'
            onChange={(event) => this.setState({
              ...this.state,
              keyDisplayType: event.target.value
            })}
            value={this.state.keyDisplayType}
          >
            <option
              className='key-display-type-option'
              value={keyContentType.PLAIN_TEXT}
            >
              {keyContentType.PLAIN_TEXT}
            </option>
            <option
              className='key-display-type-option'
              value={keyContentType.JSON}
            >
              {keyContentType.JSON}
            </option>
          </select>
        </span>

        <span className='content-last-updated-timestamp'>
          <span className='last-updated-timestamp-label'>
            Last updated:
          </span>
          <span className='last-updated-timestamp-text'>
            {(new Date()).toString()}
          </span>
        </span>
        <label className='show-content-updates'>
          <input
            className='show-updates-switch'
            type='checkbox'
          />
          <span className='show-updates-label'>
            show updates
          </span>
        </label>
      </div>
    </div>)
  }
}