import React, {Component, PropTypes} from 'react';

import classNames from 'classnames';

export default class LabeledInput extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.string,
        hasError: PropTypes.bool,
        isRequired: PropTypes.bool
    };

    static defaultProps = {
        type: 'text',
        hasError: false,
        isRequired: false
    };

    render() {
        return (<span
            className={classNames('labeled-input',
                this.props.hasError ? 'error' : '',
                this.props.className)}
        >
            <label className="input-label-container">
                <input
                    className="input"
                    type={this.props.type}
                    title={this.props.title}
                    placeholder={this.props.placeholder}
                />
                <span className="input-label">
                    {this.props.children}
                    {this.props.isRequired
                        ? (<i
                                className='required-icon fa fa-asterisk fa-fw'
                                aria-hidden='true'
                            />)
                        : ''}
                </span>
            </label>
        </span>);
    }
}
