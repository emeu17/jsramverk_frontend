import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './Editor.css';

import { baseUrl} from "../vars.js";

class Editor extends Component {
    constructor(props) {
        super(props);
        // this.mytext = this.props.dataApp.editorHtml;
        this.isScreenMounted = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.socketUpdate = this.socketUpdate.bind(this);
        this.updateId = this.updateId.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setEditorContent = this.setEditorContent.bind(this);
        this.state = {
            email: "",
            messageCont: "",
            showMessage: false,
            token: ""
        };
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
        const token = this.getToken();

        this.setState({token: token});

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
                    'x-access-token': token,
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    name: this.props.dataApp.currDocName,
                    content: this.props.dataApp.editorHtml
                })
            };

            // fetch('http://localhost:1337/docs', requestOptions)
            fetch(`${baseUrl}/docs`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (!this.isScreenMounted.current) {
                        return;
                    }
                    this.updateId(data.data.msg);
                });
        }
        //connect to correct room
        this.props.appSocket.emit("create", this.props.dataApp.docId);

        this.props.appSocket.on("doc", (data) => {
            // console.log("inside doc: " + data.html);
            // this.updateEditor(data.html);
            this.setEditorContent(data.html);
        });
    }

    getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        return userToken;
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
        this.isScreenMounted.current = false;
    }

    async addUser(newAllowedEmail, token) {
        return fetch(`${baseUrl}/docs/userDocs`, {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                user: newAllowedEmail,
                _id: this.props.dataApp.docId
            })
        })
            .then(response => {
                if (response.ok) {
                    this.setState({
                        messageCont: newAllowedEmail + " added, can now edit document",
                        showMessage: true
                    });
                    return;
                }
                this.setState({
                    messageCont: "Error could not add " + newAllowedEmail,
                    showMessage: true
                });
            });
    }

    async handleSubmit(e) {
        e.preventDefault();
        // const token = this.getToken();

        let newAllowedEmail = this.state.email;

        // const user = await this.addUser(newAllowedEmail, this.state.token);
        await this.addUser(newAllowedEmail, this.state.token);

        // this.setState({message: user});
    }

    sendMail(e) {
        e.preventDefault();
        let newAllowedEmail = this.state.email;

        if (newAllowedEmail == "") {
            this.setState({
                messageCont: "Not a valid email",
                showMessage: true
            });
            return;
        }

        let token = this.state.token;

        fetch(`${baseUrl}/mail`, {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                newUser: newAllowedEmail,
                _id: this.props.dataApp.docId,
                docName: this.props.dataApp.currDocName
            })
        })
            .then(response => {
                if (response.ok) {
                    this.setState({
                        messageCont: "Email sent to "
        + newAllowedEmail + ". Can now edit document",
                        showMessage: true
                    });
                    return;
                }
                this.setState({
                    messageCont: "Error could not send email/add " + newAllowedEmail,
                    showMessage: true
                });
            });
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
                <form>
                    <label className="Doc-label">Add email that can edit document:</label>
                    <input
                        type="email"
                        className="Doc-input"
                        onChange={e => {
                            if (e.target.value.includes('@')) {
                                this.setState({email: e.target.value});
                            } else {
                                this.setState({email: ''});
                            }
                        }}
                    />
                    <button type="submit" className="Add-user-btn" onClick={this.handleSubmit}>
                        Add user
                    </button>
                    <button className="Add-user-btn" onClick={this.sendMail}>Send invite</button>
                    { this.state.showMessage &&
                            <span
                                className="Message-add"
                            >
                                *** Info: {this.state.messageCont} ***
                            </span>
                    }
                </form>
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
