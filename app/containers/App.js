import React, { Component, PropTypes } from 'react'

import Main from './MainLayout'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div className='app-container'>
        <Main />
      </div>
    )
  }
}
