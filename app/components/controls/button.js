import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Button extends Component {
    static propTypes = {
        type: PropTypes.string,
        isInactiveTransparentBorder: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        isInactiveTransparentBorder: false
    };

    render() {
        return (<button
            ref={(button) => this.innerButton = button}
            className={classNames('button',
                this.props.isInactiveTransparentBorder
                    ? 'inactive-transparent-border'
                    : false,
                this.props.className || '')}
            type={this.props.type}
            onClick={(event) => {
                this.props.onClick && this.props.onClick(event);
                this.innerButton.blur();
            }}
        >
          {this.props.children}
        </button>);
    }
}
