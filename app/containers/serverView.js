import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ServerView from '../components/server-view/serverView'
import * as serverActions from '../actions/serverActions'

export default connect(
  state => ({
    editServerRequested: state.serverView.serverViewToolBox.editServerRequested,
    serverList: state.serverView.serverList,
    selectedServer: state.serverView.serverList.selectedServer
  }),
  dispatch => bindActionCreators(serverActions, dispatch)
)(ServerView)
