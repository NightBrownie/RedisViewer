import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Main from "../components/main";
import * as configActions from '../actions/configActions';

//Decorator doesn't seem to work with react-hot-loader and react-transform-hmr yet... :(
export default connect(
    state => ({
        treeViewWidth: state.layout.treeViewWidth
    }),
    dispatch => bindActionCreators(configActions, dispatch)
)(Main);
