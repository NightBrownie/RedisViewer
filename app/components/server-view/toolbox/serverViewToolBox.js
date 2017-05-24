import React, { Component, PropTypes } from 'react';

import ServerViewSearchTool from './serverViewSearchTool';

export default class ServerViewToolBox extends Component {
    render() {
        return (<div className="server-view-toolbox">
          <ServerViewSearchTool />
            <button className="toolbox-btn add-server-btn">
                <span className="add-server-icon fa fa-server fa-fw fa-lg" />
            </button>
            <button className="toolbox-btn settings-btn">
                <span className="settings-icon fa fa-cog fa-fw fa-lg" />
            </button>
            <button className="toolbox-btn remove-btn">
                <span className="remove-icon fa fa-trash-o fa-fw fa-lg" />
            </button>
        </div>);
    }
}
