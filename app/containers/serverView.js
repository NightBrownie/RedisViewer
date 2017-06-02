import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ServerView from '../components/server-view/serverView'
import * as serverViewActions from '../actions/serverViewActions'

export default connect(
  state => ({
    addServerRequested: state.serverView.serverViewToolBox.addServerRequested
  }),
  dispatch => bindActionCreators(serverViewActions, dispatch)
)(ServerView)
