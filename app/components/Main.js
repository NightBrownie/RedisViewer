import React, {Component} from 'react';
import SplitPane from 'react-split-pane';

export default class Main extends Component {
    render() {
        return (
            <SplitPane
                className="main-layout-container"
                split="vertical"
                minSize={0}
                defaultSize={100}
                maxSize={-5}
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
