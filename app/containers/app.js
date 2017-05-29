import React, { Component, PropTypes } from 'react';

import Main from '../containers/main';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
          <div className="app-container">
            <Main />
          </div>
        );
    }
}
