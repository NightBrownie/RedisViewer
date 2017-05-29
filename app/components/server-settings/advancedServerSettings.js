import React, {Component} from 'react';

import LabeledInput from '../labeledInput';

export default class AdvancedServerSettings extends Component {
    render() {
        return <div className="advanced-server-settings">
            <LabeledInput>
                Keys Root Pattern
            </LabeledInput>
            <LabeledInput>
                Keys Folder Separator
            </LabeledInput>
            <LabeledInput>
                Connection Timeout
            </LabeledInput>
            <LabeledInput>
                Execution Timeout
            </LabeledInput>
        </div>;
    }
}
