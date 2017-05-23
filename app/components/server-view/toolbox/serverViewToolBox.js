import React, { Component, PropTypes } from 'react';

import ServerViewSearchTool from './serverViewSearchTool';

export default class ServerViewToolBox extends Component {
    render() {
        return (<div className="server-view-toolbox">
          <ServerViewSearchTool />
          <button className="toolbox-btn add-server-btn add-server-icon" />
          <button className="toolbox-btn settings-btn settings-icon" />
          <button className="toolbox-btn remove-btn remove-icon" />
        </div>);
    }
}
