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
        //if no document name is added yet, show text from if-statement
        let currDoc = this.props.dataApp.currDocName;

        if (currDoc === "") {
            currDoc = "No document selected yet";
        }
        return (
            <div>
                <p>Current doc: <i> { currDoc } </i></p>
                <TrixEditor
                    className="Trix"
                    value={this.props.dataApp.editorHtml}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Editor;
