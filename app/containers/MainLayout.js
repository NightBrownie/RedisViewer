import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import MainLayout from '../components/MainLayout'
import mainLayoutActions from '../actions/mainLayout'

export default withRouter(connect(
  state => ({
    serverViewWidth: state.layout.serverViewWidth
  }),
  dispatch => bindActionCreators(mainLayoutActions, dispatch)
)(MainLayout))
