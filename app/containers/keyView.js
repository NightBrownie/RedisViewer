import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import KeyView from '../components/keyView/keyView'

import * as keyActions from '../actions/keyActions'

export default connect(
  state => ({
    server: state.key.server,
    keyName: state.key.key,
    shouldRedirectToTheRoot: state.key.shouldRedirectToTheRoot,
    previousData: state.key.previousData,
    currentData: state.key.currentData,
    lastUpdateTime: state.key.lastUpdateTime,
    loadingKeyData: state.key.loadingKeyData,
    isUpdatesTrackEnabled: state.key.isUpdatesTrackEnabled,
    isUpdatesTrackToggling: state.key.isUpdatesTrackToggling
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
