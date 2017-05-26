import React, { Component } from 'react';
import classNames from 'classnames';

export default class Button extends Component {
    render() {
        return (<button className={classNames('button', this.props.className || '')}>
          {this.props.children}
        </button>);
    }
}
