import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import serverView from '../components/server-view/serverView';
import * as serverViewActions from '../actions/serverViewActions';

export default connect(
    store => store.serverView,
    dispatch => bindActionCreators(serverViewActions, dispatch)
)(serverView);
