import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Button extends Component {
    static propTypes = {
        type: PropTypes.string,
        isInactiveTransparentBorder: PropTypes.bool
    };

    static defaultProps = {
        isInactiveTransparentBorder: false
    };

    render() {
        return (<button
            className={classNames('button',
                this.props.isInactiveTransparentBorder
                    ? 'inactive-transparent-border'
                    : false,
                this.props.className || '')}
            type={this.props.type}
        >
          {this.props.children}
        </button>);
    }
}
