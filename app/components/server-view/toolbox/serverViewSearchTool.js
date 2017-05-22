import React, { Component } from 'react';

export default class ServerViewSearchTool extends Component {
    render() {
        return (<span className="server-view-search-tool">
          <input className="search-field" type="text" title="Input search term here" />
          <span className="search-icon">1</span>
        </span>);
    }
}
