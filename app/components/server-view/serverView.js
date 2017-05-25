import React, { Component, PropTypes } from 'react';

import ServerViewToolBox from './toolbox/serverViewToolBox';
import ServerList from './server-list/serverList';

export default class ServerView extends Component {
    render() {
        return (<div className="server-view">
          <ServerViewToolBox />
          <ServerList />
        </div>);
    }
}
