import { connect } from 'react-redux'

import KeyView from '../components/keyView/keyView'

export default connect(
  state => ({
    server: state.keyView.server,
    keyName: state.keyView.key,
    shouldRedirectToTheRoot: state.keyView.shouldRedirectToTheRoot
  })
)(KeyView)
