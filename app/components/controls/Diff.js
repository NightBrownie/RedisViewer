import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { diffChars, diffWords, diffSentences, diffJson } from 'diff'
import classNames from 'classnames'

const fnMap = {
  'chars': diffChars,
  'words': diffWords,
  'sentences': diffSentences,
  'json': diffJson
}

export default class Diff extends Component {
  static propTypes = {
    inputA: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    inputB: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    type: PropTypes.oneOf([
      'chars',
      'words',
      'sentences',
      'json'
    ]),
    className: PropTypes.string
  }

  static defaultProps = {
    inputA: '',
    inputB: '',
    type: 'chars'
  }

  render () {
    let diff = fnMap[this.props.type](this.props.inputA, this.props.inputB)
    let result = diff.map(function (part, index) {
      let spanClass = part.added ? 'addition' : part.removed ? 'deletion' : 'unchanged'
      return (
        <span key={index} className={spanClass}>
          {part.value}
        </span>
      )
    })
    return (
      <pre className={classNames('diff-result', this.props.className)}>
        {result}
      </pre>
    )
  }
}
