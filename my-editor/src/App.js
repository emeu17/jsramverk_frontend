import logo from './notepad.png';
import './App.css';
import Editor from './Editor';
import Toolbar from './Toolbar';
import React, { Component } from 'react';


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
