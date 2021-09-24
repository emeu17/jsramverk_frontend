import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import logo from './notepad.png';
import './App.css';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Home from './Home';
import List from './List';

import socketIOClient from "socket.io-client";
// import io from "socket.io-client";
// import socketio from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:1337";
const ENDPOINT = "https://jsramverk-editor-emeu17.azurewebsites.net/";

class App extends Component {
    //App contains editors text saved as state variable
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateDoc = this.updateDoc.bind(this);
        this.updateId = this.updateId.bind(this);
        this.setEditorContent = this.setEditorContent.bind(this);
        // socket.connect();
        this.socket = socketIOClient(ENDPOINT);
        this.state = {
            editorTxt: "",
            editorHtml: "",
            currDocName: "",
            docId: "",
        };
    }

    //handle change of editors text
    handleChange(html, text) {
        // html is the new html content
        // text is the new text content
        this.setState({editorTxt: text, editorHtml: html});
        //emit html content of doc + document Id
        let data = {
            _id: this.state.docId,
            html: html
        };

        this.socket.emit("create", data._id);
        // console.log("created room: " + data._id);
        this.socket.emit('doc', data);
        // console.log("doc id: " + this.state.docId);
    }

    updateDoc(idDoc, docName, txt) {
        this.setState({docId: idDoc, editorHtml: txt, currDocName: docName});
    }

    setEditorContent(txt) {
        this.setState({editorHtml: txt });
        // console.log("retrieved data, content updated: " + txt);
    }

    updateId(newId) {
        this.setState({docId: newId});
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Toolbar
                        editorTxt={this.state.editorHtml}
                        currDocName={this.state.currDocName}
                        docId={this.state.docId}
                    />
                    <div className="Doc-container">
                        <Link className="Links" to="/">Home</Link>
                        <Link className="Links" to ="/editor">Editor</Link>
                        <Link className="Links" to ="/list">List documents</Link>
                    </div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            My Editor
                        </p>
                    </header>
                    <Switch>
                        <Route path="/editor">
                            <Editor
                                dataApp={this.state}
                                appSocket={this.socket}
                                handleChange={this.handleChange}
                                updateId={this.updateId}
                                setEditorContent={this.setEditorContent}
                            />
                        </Route>
                        <Route path="/list">
                            <List />
                        </Route>
                        <Route path="/">
                            <Home doc={this.state} updateDoc={this.updateDoc}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
