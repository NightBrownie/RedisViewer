import React, { Component, PropTypes } from 'react';

import ServerListItem from './serverListItem';

export default class ServerList extends Component {
    render() {
        return (<div className="server-list-container">
          <ul className="server-list">
            <ServerListItem treeViewSpans={[]} />
            <ServerListItem treeViewSpans={[]} />
            <ServerListItem treeViewSpans={[]} />
            <ServerListItem treeViewSpans={[]} />
          </ul>
        </div>);
    }
}
