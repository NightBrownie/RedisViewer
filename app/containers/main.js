import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Main from '../components/main';
import * as configActions from '../actions/mainLayoutActions';

// Decorator doesn't seem to work with react-hot-loader and react-transform-hmr yet... :(
export default connect(
    state => ({
        serverViewWidth: state.layout.serverViewWidth
    }),
    dispatch => bindActionCreators(configActions, dispatch)
)(Main);
