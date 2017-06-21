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
    loadingKeyData: state.keyView.loadingKeyData,
    isUpdatesAutoTrackEnabled: state.keyView.isUpdatesAutoTrackEnabled,
    isUpdatesAutoTrackToggling: state.keyView.isUpdatesAutoTrackToggling
  }),
  dispatch =>
    ({
      ...bindActionCreators(keyActions, dispatch),
      toggleKeyUpdatesAutoTrack: (server, key, enableTrack) => {
        enableTrack
          ? dispatch(keyActions.subscribe(server, key))
          : dispatch(keyActions.unsubscribe(server, key))
      }
    })
)(KeyView)
