import React, {Component, PropTypes} from 'react';

import ServerViewSearchTool from './serverViewSearchTool';

export default class ServerViewToolBox extends Component {
    render() {
        return <div className="server-view-toolbox">
            Server view toolbox
            <ServerViewSearchTool />
        </div>;
    }
}
