import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import Main from '../components/main'
import * as configActions from '../actions/mainLayoutActions'

export default withRouter(connect(
  state => ({
    serverViewWidth: state.layout.serverViewWidth
  }),
  dispatch => bindActionCreators(configActions, dispatch)
)(Main))
