import React, {Component} from 'react';

import LabeledInput from '../labeledInput';

export default class PrimaryServerSettings extends Component {
    render() {
        return <div className="primary-server-settings">
            <LabeledInput
                hasError={true}
                isRequired={true}
            >
                Server Name
            </LabeledInput>
            <LabeledInput isRequired={true}>
                Host
            </LabeledInput>
            <LabeledInput isRequired={true}>
                Port
            </LabeledInput>
            <LabeledInput>
                Password
            </LabeledInput>
        </div>;
    }
}
