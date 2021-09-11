import React, { Component } from 'react';
import "trix/dist/trix";
import { TrixEditor } from "react-trix";

import './Editor.css';


class Editor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html, text) {
        this.props.handleChange(html, text);
    }

    render() {
        return (
            <div>
                <p>Current doc: { this.props.dataApp.currDocName}</p>
                <TrixEditor className="Trix" value={this.props.dataApp.editorTxt} onChange={this.handleChange} />
            </div>
        );
    }
}

export default Editor;
