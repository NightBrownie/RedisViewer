import React, {Component} from 'react';

import LabeledInput from '../labeledInput';

export default class PrimaryServerSettings extends Component {
    render() {
        return <div className="primary-server-settings">
            <LabeledInput>
                Server Name
            </LabeledInput>
            <LabeledInput>
                Host
            </LabeledInput>
            <LabeledInput>
                Port
            </LabeledInput>
            <LabeledInput>
                Password
            </LabeledInput>
        </div>;
    }
}
