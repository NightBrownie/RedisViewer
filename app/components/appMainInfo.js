import React, {Component} from 'react'

export default class AppMainInfo extends Component {
  render () {
    return (<div className='app-main-info'>
      <h1>RedisViewer</h1>
      <svg>
        <use href='/resources/images/logo.svg' />
      </svg>
    </div>)
  }
}
