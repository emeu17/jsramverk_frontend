import React, { Component } from 'react';
import './Toolbar.css';

class Toolbar extends Component {
    handleClick = () => {
        // when Save-button is clicked, print editors text to console
        console.log(this.props.editorTxt);
    }
    render() {
        return (
            <div className="Toolbar">
                <button className="Save-button" onClick={() => this.handleClick()}> Save </button>
            </div>
        )
    }
}

export default Toolbar;
