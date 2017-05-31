import React, { Component, PropTypes } from 'react';

import Button from '../../controls/button';
import ServerViewSearchTool from './serverViewSearchTool';

export default class ServerViewToolBox extends Component {
    render() {
        return (<div className="server-view-toolbox">
            <ServerViewSearchTool />
            <Button
                className="add-server-btn"
                isInactiveTransparentBorder={true}
            >
                <i className="add-server-icon fa fa-server fa-fw fa-lg" />
            </Button>
            <Button
                className="settings-btn"
                isInactiveTransparentBorder={true}
            >
                <i className="settings-icon fa fa-cog fa-fw fa-lg" />
            </Button>
            <Button
                className="remove-btn"
                isInactiveTransparentBorder={true}
            >
                <i className="remove-icon fa fa-trash-o fa-fw fa-lg" />
            </Button>
        </div>);
    }
}
