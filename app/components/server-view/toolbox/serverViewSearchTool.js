import React, { Component } from 'react';

import LabeledInput from '../../labeledInput';

export default class ServerViewSearchTool extends Component {
    render() {
        return (<LabeledInput
            className="server-view-search-tool"
            placeholder="Type filter term here..."
            type="text"
            title="Input search term here"
        >
            <i className="search-icon fa fa-search fa-fw" aria-hidden="true" />
        </LabeledInput>);
    }
}
