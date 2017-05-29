import React, {Component, PropTypes} from 'react';

import classNames from 'classnames';

export default class LabeledInput extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.string
    };

    static defaultProps = {
        type: 'text'
    };

    render() {
        return (<span className={classNames('labeled-input', this.props.className)}>
            <label className="input-label-container">
                <input
                    className="input"
                    type={this.props.type}
                    title={this.props.title}
                    placeholder={this.props.placeholder}
                />
                <span className="input-label">
                    {this.props.children}
                </span>
            </label>
        </span>);
    }
}
