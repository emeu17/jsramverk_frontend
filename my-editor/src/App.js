import logo from './notepad.png';
import './App.css';
import "trix/dist/trix";
import React, { Component } from 'react';
import { TrixEditor } from "react-trix";

class Editor extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          editorTxt: ""
      };
  }

  handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
    editor.insertString("editor is ready");
  }

  handleChange = (html, text) => {
    // html is the new html content
    // text is the new text content

    this.setState(() => ({
      editorTxt: text,
    }));

  }

  handleClick = () => {
      // console.log(this.state.editorTxt);
      console.log(this.state.editorTxt);
  }

  render() {
    return (
        <div>
          <button className="Save-button" onClick={() => this.handleClick()}> Save </button>
          <TrixEditor className="Trix" onChange={this.handleChange} onEditorReady={this.handleEditorReady} />
        </div>
    );
  }
}

class App extends Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My Editor
        </p>
      </header>
      <Editor />
    </div>
    );
  }
}

export default App;
