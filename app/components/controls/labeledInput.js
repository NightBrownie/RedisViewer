import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

export default class LabeledInput extends Component {
  static propTypes = {
    errors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.any),
      PropTypes.any
    ]),
    errorPrefix: PropTypes.string,
    errorMessagesPlacement: PropTypes.oneOf(['top', 'bottom']),
    isRequired: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    errorMessagesPlacement: 'top',
    errorPrefix: '',
    isRequired: false
  }

  constructor () {
    super()

    this.state = {
      isFocused: false,
      isMouseOver: false
    }
  }

  render () {
    let {
      errors,
      isRequired,
      children,
      className,
      errorMessagesPlacement,
      errorPrefix,
      ...inputProps
    } = this.props

    if (errors && !Array.isArray(errors)) {
      errors = [errors]
    }

    return (
      <span
        className={classNames('labeled-input',
          errors ? 'error' : '',
          className)}
      >
        <label
          className="input-label-container"
          onMouseEnter={() =>
            this.setState({
              ...this.state,
              isMouseOver: true
            })
          }
          onMouseLeave={() =>
            this.setState({
              ...this.state,
              isMouseOver: false
            })
          }
        >
          <input
            className="input"
            {...inputProps}
            onFocus={(event) => {
              this.setState({
                ...this.state,
                isFocused: true
              })
              this.props.onFocus && this.props.onFocus(event)
            }}
            onBlur={(event) => {
              this.setState({
                ...this.state,
                isFocused: false
              })
              this.props.onBlur && this.props.onBlur(event)
            }}
          />
          <span className="input-label">
            {children}
            {isRequired
              ? (<i
                className='required-icon fa fa-asterisk fa-fw'
                aria-hidden='true'
              />)
              : ''
            }
          </span>
          {(
            <ul
              className={classNames(
                'popup error-messages-container',
                errorMessagesPlacement,
                errors && (this.state.isFocused || this.state.isMouseOver)
                  ? ''
                  : 'hidden'
              )}
            >
              {
                errors && errors.map((error) => (
                  <li
                    key={error}
                    className='error-message'
                  >
                    <i
                      className='error-message-icon fa fa-exclamation fa-fw'
                      aria-hidden='true'
                    />
                    <span className='error-message-text'>
                      {errorPrefix}
                      {error}
                    </span>
                  </li>
                ))
              }
            </ul>
          )}
        </label>
      </span>
    )
  }
}
