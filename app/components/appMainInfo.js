import React, {Component} from 'react'
import logo from '../../assets/images/logo.svg'

export default class AppMainInfo extends Component {
  render () {
    return (<div className='app-main-info'>
      <h1>RedisViewer</h1>
      <svg
        viewBox='0 0 100 100'
        className='app-icon'
      >
        <use xlinkHref={`${logo}#redis-viewer-icon`} />
      </svg>
    </div>)
  }
}
