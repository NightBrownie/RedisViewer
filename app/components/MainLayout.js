import React, { Component, PropTypes } from 'react'

import mainRoutes from '../routing/mainRoutes'

import SplitPane from 'react-split-pane'
import ServerView from '../containers/ServerView'
import { SERVER_VIEW_MIN_SIZE, RIGHT_PANEL_MIN_SIZE } from '../constants/defaultSettings'

export default class Main extends Component {
  static propTypes = {
    serverViewWidth: PropTypes.number,
    serverViewWidthChanged: PropTypes.func.isRequired,
    serverViewRequestWidthRestore: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.serverViewRequestWidthRestore()
  }

  render () {
    return (
      <SplitPane
        className='main-layout-container'
        split='vertical'
        minSize={SERVER_VIEW_MIN_SIZE}
        defaultSize={this.props.serverViewWidth}
        onChange={this.props.serverViewWidthChanged}
        maxSize={-RIGHT_PANEL_MIN_SIZE}
      >
        <ServerView />
        <div className='right-panel'>
          {mainRoutes}
        </div>
      </SplitPane>
    )
  }
}
