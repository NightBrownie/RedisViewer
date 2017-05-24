import React, { Component } from 'react';

export default class ServerViewSearchTool extends Component {
    render() {
        return (<span className="server-view-search-tool">
          <label className="search-field-label">
            <input className="search-field" type="text" title="Input search term here" />
            <span className="search-icon fa fa-search fa-fw" aria-hidden="true" />
          </label>
        </span>);
    }
}
