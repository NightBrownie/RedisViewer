import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import KeyView from '../components/keyView/keyView'

import keyActions from '../actions/key'

export default connect(
  state => ({
    server: state.keyView.server,
    keyName: state.keyView.key,
    shouldRedirectToTheRoot: state.keyView.shouldRedirectToTheRoot,
    previousData: state.keyView.previousData,
    currentData: state.keyView.currentData,
    lastUpdateTime: state.keyView.lastUpdateTime,
    loadingKeyData: state.keyView.loadingKeyData,
    isUpdatesTrackEnabled: state.keyView.isUpdatesTrackEnabled,
    isUpdatesTrackToggling: state.keyView.isUpdatesTrackToggling
  }),
  dispatch =>
    ({
      ...bindActionCreators(keyActions, dispatch),
      toggleKeyUpdatesTrack: (server, key, enableTrack) => {
        enableTrack
          ? dispatch(keyActions.subscribe(server, key))
          : dispatch(keyActions.unsubscribe(server, key))
      }
    })
)(KeyView)
