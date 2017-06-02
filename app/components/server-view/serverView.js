import React, { Component, PropTypes } from 'react';

import ServerViewToolBox from './toolbox/serverViewToolBox';
import ServerList from './server-list/serverList';

export default class ServerView extends Component {
    static propTypes = {
        requestServerList: PropTypes.func.isRequired,
        requestAddServer: PropTypes.func.isRequired,
        addServerRequested: PropTypes.bool.isRequired
    };

    static defaultProps = {
        addServerRequested: false
    };

    componentWillMount() {
        this.props.requestServerList();
    }

    render() {
        return (<div className="server-view">
          <ServerViewToolBox
            requestAddServer={this.props.requestAddServer}
            addServerRequested={this.props.addServerRequested}
          />
          <ServerList />
        </div>);
    }
}
