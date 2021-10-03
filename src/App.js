import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import logo from './notepad.png';
import './App.css';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Home from './Home';
import List from './List';
import Register from './Register';
import Login from './Login';

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
        this.setToken = this.setToken.bind(this);
        this.setEditorContent = this.setEditorContent.bind(this);
        // socket.connect();
        this.socket = socketIOClient(ENDPOINT);
        this.state = {
            editorHtml: "",
            currDocName: "",
            docId: ""
        };
    }

    //handle change of editors text
    handleChange(html) {
        // html is the new html content
        this.setState({editorHtml: html});
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

    setToken(newToken) {
        this.setState({token: newToken});
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
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <Home
                                doc={this.state}
                                updateDoc={this.updateDoc}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
