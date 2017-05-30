import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Button from './button';

export default class OptionsButton extends Component {
    static propTypes = {
        isInactiveTransparentBorder: PropTypes.bool
    };

    static defaultProps = {
        isInactiveTransparentBorder: true
    };


    render() {
        return (<Button
            className={classNames(this.props.className, 'options-button')}
            isInactiveTransparentBorder={this.props.isInactiveTransparentBorder}
        >
          <i className="options-button-icon fa fa-ellipsis-v fa-fw fa-lg" aria-hidden="true" />
          {this.props.children}
        </Button>);
    }
}
