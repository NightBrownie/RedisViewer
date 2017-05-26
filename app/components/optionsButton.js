import React, { Component } from 'react';
import classNames from 'classnames';

import Button from './button';

export default class OptionsButton extends Component {
    render() {
        return (<Button className={classNames(this.props.className, 'options-button')}>
          <i className="options-button-icon fa fa-ellipsis-v fa-fw fa-lg" aria-hidden="true" />
          {this.props.children}
        </Button>);
    }
}
