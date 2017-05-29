import React, {Component} from 'react';

export default class Expander extends Component {
    render() {
        return (<div>
            {this.props.children}
        </div>);
    }
}
