import React, { Component } from 'react';

import './Editor.css';


class Temp extends Component {
    render() {
        return (
            <div>
                <p>Current doc: { this.props.data.currDocName}</p>
            </div>
        );
    }
}

export default Temp;
