import React, {Component} from 'react'

import PrimaryServerSettings from './primaryServerSettings';
import AdvancedServerSettings from './advancedServerSettings';
import Expander from '../expander';

export default class ServerSettings extends Component {
  render () {
    return (<div className="server-settings">
        <PrimaryServerSettings />
        <Expander>
            <AdvancedServerSettings />
        </Expander>
    </div>);
  }
}
