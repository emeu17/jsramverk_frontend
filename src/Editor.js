import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './Editor.css';
// import memoize from "memoize-one";

class Editor extends Component {
    constructor(props) {
        super(props);
        // this.mytext = this.props.dataApp.editorHtml;
        this.quillRef = null;
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this);
        this.socketUpdate = this.socketUpdate.bind(this);
        this.updateId = this.updateId.bind(this);
        this.setEditorContent = this.setEditorContent.bind(this);
    }

    handleChange(html) {
        this.props.handleChange(html);
    }

    socketUpdate() {
        let data = {
            _id: this.props.dataApp.docId,
            html: this.props.dataApp.editorHtml
        };

        // console.log("created room: " + data._id);
        this.props.appSocket.emit('doc', data);
    }


    componentDidMount() {
        //if new doc, save it right away and set id to new id
        if (this.props.dataApp.docId === "no-id") {
            //if no document name has been set, return nothing from function
            if (this.props.dataApp.currDocName === "") {
                console.log("no document name specified, will not save");
                return;
            }
            // console.log("no id yet");
            let requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
                },
                body: JSON.stringify({
                    name: this.props.dataApp.currDocName,
                    content: this.props.dataApp.editorHtml
                })
            };

            // fetch('http://localhost:1337/docs', requestOptions)
            fetch('https://jsramverk-editor-emeu17.azurewebsites.net/docs', requestOptions)
                .then(response => response.json())
                .then(data => this.updateId(data.data.msg));
        }
        //connect to correct room
        this.props.appSocket.emit("create", this.props.dataApp.docId);

        this.props.appSocket.on("doc", (data) => {
            // console.log("inside doc: " + data.html);
            // this.updateEditor(data.html);
            this.setEditorContent(data.html);
        });
    }

    setEditorContent(txt) {
        this.props.setEditorContent(txt);
    }


    updateId(newId) {
        console.log("adding new Id: " + newId);
        this.props.updateId(newId);
    }

    //leave room when changing view
    componentWillUnmount() {
        this.props.appSocket.emit("leave", this.props.dataApp.docId);
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
                <ReactQuill
                    theme="snow"
                    value={this.props.dataApp.editorHtml}
                    onChange={this.handleChange}
                    onKeyUp={this.socketUpdate}
                />
            </div>
        );
    }
}

export default Editor;
