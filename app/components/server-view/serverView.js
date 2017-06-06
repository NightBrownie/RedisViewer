import React, { Component, PropTypes } from 'react';

import ServerViewToolBox from './toolbox/serverViewToolBox';
import ServerList from './server-list/serverList';

export default class ServerView extends Component {
    static propTypes = {
      requestServerList: PropTypes.func.isRequired,
      requestEditServer: PropTypes.func.isRequired,
      editServerRequested: PropTypes.bool.isRequired,
      serverList: PropTypes.object.isRequired,
      serverSelected: PropTypes.func.isRequired,
      selectedServer: PropTypes.object
    };

    static defaultProps = {
      editServerRequested: false
    };

    componentWillMount() {
      this.props.requestServerList();
    }

    render() {
      return (<div className="server-view">
        <ServerViewToolBox
          requestEditServer={this.props.requestEditServer}
          editServerRequested={this.props.editServerRequested}
          selectedServer={this.props.selectedServer}
        />
        <ServerList
          serverList={this.props.serverList}
          serverSelected={this.props.serverSelected}
        />
      </div>);
    }
}
