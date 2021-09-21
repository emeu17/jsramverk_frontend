import React, { Component } from 'react';
import { Link }  from "react-router-dom";

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.updateDoc = this.updateDoc.bind(this);
        this.newDoc = this.newDoc.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('https://jsramverk-editor-emeu17.azurewebsites.net/list')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    updateDoc(doc, cont, newDoc) {
        // when update is clicked
        console.log("doc:" + doc, ", cont: " + cont);
        //update document name and content
        this.props.updateDoc(doc, cont, newDoc);
        // console.log(this.props.editorHtml);
    }

    newDoc() {
        // when create new document btn is clicked
        console.log("doc name:" + this.state.inputfield);
        let docName = this.state.inputfield;

        if (docName === undefined) {
            console.log("No document name");
            docName = "";
        }
        this.updateDoc(docName, "Write here...", true);
    }

    updateInputValue(evt) {
        //console.log("input field updated with "+evt.target.value);
        this.setState({inputfield: evt.target.value});
    }

    render() {
        const { data } = this.state;

        return (
            <div className="Index-page">
                <h1>Welcome</h1>
                <form>
                    <input
                        type="text" id="new"
                        className="Doc-input"
                        onChange={this.updateInputValue}
                        placeholder="Enter name of document"
                    />
                    <Link to="/editor" className="New-btn" onClick={() => this.newDoc()}>
                        Create new document
                    </Link>
                </form>
                <p><u>or update an existing document:</u></p>
                {data.map(doc =>
                    <div key={doc._id}>
                        <p>
                            <i>{doc.name}</i>
                            <Link
                                to="/editor"
                                className="Edit-link"
                                onClick={() => this.updateDoc(doc.name, doc.content, false)}>
                                    &#9998;
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
