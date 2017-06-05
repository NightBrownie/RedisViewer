import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export default class LabeledInput extends Component {
    static propTypes = {
        errors: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.string),
          PropTypes.string
        ]),
        isRequired: PropTypes.bool,
    };

    static defaultProps = {
        isRequired: false
    };

    render() {
        const {
          errors,
          isRequired,
          children,
          className,
          ...inputProps
        } = this.props;

        return (<span
            className={classNames('labeled-input',
              errors ? 'error' : '',
              className)}
        >
            <label className="input-label-container">
                <input
                    className="input"
                    {...inputProps}
                />
                <span className="input-label">
                    {children}
                    {isRequired
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
