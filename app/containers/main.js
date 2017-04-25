import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as configActions from '../actions/configActions';

import SplitPane from 'react-split-pane';

export class Main extends Component {
    static propTypes = {
        treeViewWidth: PropTypes.number,
        treeViewWidthChanged: PropTypes.func.isRequired,
        treeViewWidthRestoreRequested: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.treeViewWidthRestoreRequested();
    }

    render() {
        return (
            <SplitPane
                className="main-layout-container"
                split="vertical"
                minSize={150}
                defaultSize={this.props.treeViewWidth}
                onChange={this.props.treeViewWidthChanged}
                maxSize={-150}
            >
                <div className="left-panel">
                </div>
                <div className="right-panel">
                    {/*TODO: routing here*/}
                </div>
            </SplitPane>
        );
    }
}

//Decorator doesn't seem to work with react-hot-loader and react-transform-hmr yet... :(
export default connect(
    state => ({
        treeViewWidth: state.layout.treeViewWidth
    }),
    dispatch => bindActionCreators(configActions, dispatch)
)(Main);
