import React, { Component } from 'react';
import "trix/dist/trix";
import { TrixEditor } from "react-trix";

import './Editor.css';
// import memoize from "memoize-one";

class Editor extends Component {
    constructor(props) {
        super(props);
        // this.mytext = this.props.dataApp.editorHtml;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html, text) {
        this.props.handleChange(html, text);
    }

    componentDidMount() {
        //connect to correct room
        this.props.appSocket.emit("create", this.props.dataApp.docId);

        this.props.appSocket.on("doc", (data) => {
            // console.log("inside doc: " + data.html);
            this.updateEditor(data.html);
        });
    }

    componentDidUpdate(prevProps) {
        //update editor with new value
        if (this.props.dataApp != prevProps.dataApp) {
            // document.getElementById("myForm").reset();
            // console.log("yes! data: " + this.props.dataApp.editorHtml);
            this.updateEditor(this.props.dataApp.editorHtml);
        }
    }

    updateEditor(upTxt) {
        var element = document.querySelector("trix-editor");
        var editor = element.editor;

        //get current position in document
        var position = editor.getPosition();

        element.value = upTxt;
        //reset back to position instead of first in doc
        editor.setSelectedRange(position);
    }

    // filter = memoize(
    //   (htmlTxt) => list.filter(item => item.text.includes(filterText))
    // );

    render() {
        // const htmlTxt = this.filter(this.props.dataApp);
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
