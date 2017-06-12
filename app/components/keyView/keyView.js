import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Redirect } from 'react-router'

import classNames from 'classnames'

import Diff from '../controls/diff'
import Button from '../controls/button'

import * as routes from '../../constants/routes'
import * as keyContentType from '../../constants/keyContentType'
import * as appConstants from '../../constants/appConstants'

export default class KeyView extends Component {
  static propTypes = {
    shouldRedirectToTheRoot: PropTypes.bool,
    server: PropTypes.object,
    keyName: PropTypes.string,
    requestData: PropTypes.func.isRequired,
    previousData: PropTypes.string,
    currentData: PropTypes.string,
    lastUpdateTime: PropTypes.object,
    loadingKeyData: PropTypes.bool
  }

  static defaultProps = {
    shouldRedirectToTheRoot: false,
    loadingKeyData: false
  }

  constructor (props) {
    super(props)

    this.state = {
      keyDisplayType: keyContentType.PLAIN_TEXT
    }
  }

  componentDidMount () {
    if (this.props.server && this.props.keyName) {
      this.props.requestData(this.props.server, this.props.keyName)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.server && this.props.keyName && (!prevProps.keyName || prevProps.keyName !== this.props.keyName)
    ) {
      this.props.requestData(this.props.server, this.props.keyName)
    }
  }

  render () {
    if (this.props.shouldRedirectToTheRoot) {
      return (
        <Redirect to={routes.ROOT}/>
      )
    }

    let previousData = this.props.previousData
    let currentData = this.props.currentData
    if (this.state.keyDisplayType === keyContentType.JSON && previousData) {
      try {
        let currentDataObject = JSON.parse(currentData)
        currentData = JSON.stringify(currentDataObject, null, appConstants.JSON_FORMAT_LEADING_SPACE)
      } catch (err) {}

      try {
        let previousDataObject = JSON.parse(previousData)
        previousData = JSON.stringify(previousDataObject, null, appConstants.JSON_FORMAT_LEADING_SPACE)
      } catch (err) {}
    }

    return (<div
      className='key-view-container'
    >
      <header className='key-view-header'>
        <h3 className='key-name'>
          <span className='key-name-label'>
            Key:
          </span>
          <span className='key-name-text'>
            {this.props.keyName}
          </span>
        </h3>

        <Button
          className='reload-key-data-button'
          title='Reload key data'
          onClick={() => this.props.requestData(this.props.server, this.props.keyName)}
        >
          <i
            className={
              classNames('fa fa-refresh fa-fw fa-lg',
              this.props.loadingKeyData ? 'fa-spin' : '')
            }
          />
        </Button>
      </header>

      <div className='key-content'>
        {
          this.props.previousData && this.props.currentData &&
          (<Diff
            className='key-data'
            inputA={previousData}
            inputB={currentData}
            type={this.state.keyDisplayType === keyContentType.JSON
              ? 'json'
              : 'chars'
            }
          />)
        }
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
            {
              this.props.lastUpdateTime && moment(this.props.lastUpdateTime)
                .format(appConstants.KEY_DATA_LAST_UPDATE_DATE_FORMAT)
            }
          </span>
        </span>
        <label className='show-content-updates'>
          <input
            className='show-updates-switch'
            type='checkbox'
          />
          <span className='show-updates-label'>
            Track updates
          </span>
        </label>
      </div>
    </div>)
  }
}