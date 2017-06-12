import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import KeyView from '../components/keyView/keyView'

import * as keyActions from '../actions/keyActions'

export default connect(
  state => ({
    server: state.keyView.server,
    keyName: state.keyView.key,
    shouldRedirectToTheRoot: state.keyView.shouldRedirectToTheRoot,
    previousData: state.keyView.previousData,
    currentData: state.keyView.currentData,
    lastUpdateTime: state.keyView.lastUpdateTime,
    loadingKeyData: state.keyView.loadingKeyData
  }),
  dispatch => bindActionCreators(keyActions, dispatch)
)(KeyView)
