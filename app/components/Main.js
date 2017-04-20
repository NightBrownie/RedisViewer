import React, { Component } from 'react';
import VerticalDelimiter from './VerticalDelimiter';

export default class Main extends Component {
    render() {
        return <div className="main-layout-container">
            <div className="left-panel">
            </div>
            <VerticalDelimiter></VerticalDelimiter>
            <div className="right-panel">
                {/*TODO: routing here*/}
            </div>
        </div>;
    }
}
