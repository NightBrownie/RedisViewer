import React, {Component} from 'react';

export default class ServerViewSearchTool extends Component {
    render() {
        return <div className="server-view-search-tool">
            <span className="search-icon-placeholder" />
            <input className="search-field" type="text" title="Input search term here" />
        </div>;
    }
}
