import React, { Component, PropTypes } from 'react';

import Button from '../../button';
import ServerViewSearchTool from './serverViewSearchTool';

export default class ServerViewToolBox extends Component {
    render() {
        return (<div className="server-view-toolbox">
          <ServerViewSearchTool />
            <Button className="add-server-btn">
                <i className="add-server-icon fa fa-server fa-fw fa-lg" />
            </Button>
            <Button className="settings-btn">
                <i className="settings-icon fa fa-cog fa-fw fa-lg" />
            </Button>
            <Button className="remove-btn">
                <i className="remove-icon fa fa-trash-o fa-fw fa-lg" />
            </Button>
        </div>);
    }
}
