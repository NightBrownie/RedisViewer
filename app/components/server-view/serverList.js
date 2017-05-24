import React, { Component, PropTypes } from 'react';

import ServerViewRow from './serverViewRow';

export default class ServerList extends Component {
    render() {
        return (<div className="server-list-container">
          <ul className="server-list">
            <ServerViewRow />
            <ServerViewRow />
            <ServerViewRow />
            <ServerViewRow />
            <ServerViewRow />
          </ul>
        </div>);
    }
}
