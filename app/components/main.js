import React, {Component, PropTypes} from 'react';

import SplitPane from 'react-split-pane';
import ServerView from './server-view/serverView';
import {SERVER_VIEW_MIN_SIZE} from '../constants/defaultSettings';

export default class Main extends Component {
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
                minSize={SERVER_VIEW_MIN_SIZE}
                defaultSize={this.props.treeViewWidth}
                onChange={this.props.treeViewWidthChanged}
                maxSize={-SERVER_VIEW_MIN_SIZE}
            >
                <ServerView />
                <div className="right-panel">
                    {/* TODO: routing here*/}
                </div>
            </SplitPane>
        );
    }
}
