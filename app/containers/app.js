import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
          <div className="app-container">
            {this.props.children}
          </div>
        );
    }
}
