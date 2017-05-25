import React, { Component } from 'react';

import Button from './button';

export default class OptionsButton extends Component {
    render() {
        return (<Button>
          <span className="options-button-icon" />
        </Button>);
    }
}
