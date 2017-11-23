import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Button extends Component {
    static propTypes = {
        isInactiveTransparentBorder: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        isInactiveTransparentBorder: false
    };

    render() {
        let {isInactiveTransparentBorder, ...props} = this.props

        return (<button
            {...props}
            ref={(button) => this.innerButton = button}
            className={classNames('button',
              isInactiveTransparentBorder
                ? 'inactive-transparent-border'
                : false,
              this.props.className || '')}
            onClick={(event) => {
                this.props.onClick && this.props.onClick(event);
                this.innerButton.blur();
            }}
        />);
    }
}
