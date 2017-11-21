import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ServerView from '../components/server-view/serverView'
import * as serverActions from '../actions/server'

export default connect(
  state => ({
    editServerRequested: state.serverView.serverKeyTreeToolBox.editServerRequested,
    serverKeyTree: state.serverView.serverKeyTree,
    selectedServer: state.serverView.serverKeyTree.selectedServer,
    selectedKey: state.serverView.serverKeyTree.selectedKey
  }),
  dispatch => bindActionCreators(serverActions, dispatch)
)(ServerView)
