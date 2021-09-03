import React, { Component } from 'react';
import "trix/dist/trix";
import { TrixEditor } from "react-trix";
import './Editor.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
        editor.insertString("editor is ready");
    }

    handleChange(html, text) {
        this.props.handleChange(html, text);
    }

    render() {
        return (
            <div>
                <TrixEditor className="Trix" onChange={this.handleChange} onEditorReady={this.handleEditorReady} />
            </div>
        );
    }
}

export default Editor;
