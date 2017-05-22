import React, { Component, PropTypes } from 'react';

import ServerViewSearchTool from './serverViewSearchTool';

export default class ServerViewToolBox extends Component {
    render() {
        return (<div className="server-view-toolbox">
          <ServerViewSearchTool />
          <button className="add-server-btn add-server-icon" />
          <button className="settings-btn settings-icon" />
          <button className="remove-btn remove-icon" />
        </div>);
    }
}
