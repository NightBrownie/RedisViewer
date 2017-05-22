import React, {Component, PropTypes} from 'react';

import ServerViewRow from './serverViewRow';

export default class ServerList extends Component {
    render() {
        return <div className="server-list-container">
            Server view rows:
            <ul className="server-list">
                {/*many rows will be placed here*/}
                <ServerViewRow />
            </ul>
        </div>;
    }
}
