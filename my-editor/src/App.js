import logo from './notepad.png';
import './App.css';
import "trix/dist/trix";
import React, { Component } from 'react';
import { TrixEditor } from "react-trix";

class Toolbar extends React.Component {
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

class Editor extends React.Component {
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

class App extends Component {
    //App contains editors text saved as state variable
    constructor(props) {
        super(props);
        // this.handleChange() = this.handleChange.bind(this);
        this.state = {
            editorTxt: ""
        };
    }
    //handle change of editors text
    handleChange = (html, text) => {
      // html is the new html content
      // text is the new text content
      this.setState(() => ({
        editorTxt: text,
      }));
    }
    render() {
        return (
            <div className="App">
                <Toolbar editorTxt={this.state.editorTxt}/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        My Editor
                    </p>
                </header>
                <Editor editorTxt={this.state.editorTxt} handleChange={this.handleChange}/>
            </div>
        );
    }
}

export default App;
