import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import logo from './notepad.png';
import './App.css';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Home from './Home';
import List from './List';
import Temp from './Temp';

class App extends Component {
    //App contains editors text saved as state variable
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateDoc = this.updateDoc.bind(this);
        this.state = {
            editorTxt: "",
            editorHtml: "",
            currDocName: "",
            newDoc: true
        };
    }

    //handle change of editors text
    handleChange(html, text) {
        // html is the new html content
        // text is the new text content
        this.setState({editorTxt: text, editorHtml: html});
    }

    updateDoc(docName, txt, docNew) {
        this.setState({editorHtml: txt, currDocName: docName, newDoc: docNew });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Toolbar
                        editorTxt={this.state.editorHtml}
                        currDocName={this.state.currDocName}
                        newDoc={this.state.newDoc}
                    />
                    <div className="Doc-container">
                        <Link className="Links" to="/">Home</Link>
                        <Link className="Links" to ="/editor">Editor</Link>
                        <Link className="Links" to ="/list">List documents</Link>
                        <Link className="Links" to ="/temp">Temp</Link>
                    </div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            My Editor
                        </p>
                    </header>
                    <Switch>
                        <Route path="/editor">
                            <Editor dataApp={this.state} handleChange={this.handleChange}/>
                        </Route>
                        <Route path="/list">
                            <List />
                        </Route>
                        <Route path="/temp">
                            <Temp data={this.state}/>
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
