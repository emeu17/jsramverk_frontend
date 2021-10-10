import React, { Component } from 'react';
import { Link }  from "react-router-dom";

import './Home.css';
import { baseUrl} from "../vars.js";

import Login from '../Login/Login';

class Home extends Component {
    constructor(props) {
        super(props);
        this.isScreenMounted = React.createRef();
        this.updateDoc = this.updateDoc.bind(this);
        this.newDoc = this.newDoc.bind(this);
        this.setToken = this.setToken.bind(this);
        this.getToken = this.getToken.bind(this);
        // this.getDocs = this.getDocs.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.login = false;
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const token = this.getToken();

        this.isScreenMounted.current = true;

        // console.log("token: " + token);
        if (token) {
            this.getDocs(token);
        }
    }

    async getDocs(token) {
        const userEmail = this.getEmail();

        return fetch(`${baseUrl}/graphql`, {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                query: `{
                    user (email: "${userEmail}") {
                        email,
                        _id,
                        doc_owner {
                            name, _id, content
                        },
                        allowed_docs {
                            name, _id, content
                        }
                    }
                }`
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.data) {
                    this.setState({ data: undefined });
                } else {
                    // console.log(res.data.users);
                    if (!this.isScreenMounted.current) {
                        return;
                    }
                    this.setState({ data: res.data.user });
                }
            });
    }

    async handleDocs(token) {
        await this.getDocs(token);
    }

    getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        return userToken;
    }

    getEmail() {
        const emailString = sessionStorage.getItem('email');
        const emailToken = JSON.parse(emailString);

        return emailToken;
    }

    setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));

        this.handleDocs(userToken);
    }

    updateDoc(docId, doc, cont) {
        //update document name and content
        this.props.updateDoc(docId, doc, cont);
    }

    newDoc() {
        // when create new document btn is clicked
        // console.log("doc name:" + this.state.inputfield);
        let docName = this.state.inputfield;

        if (docName === undefined) {
            console.log("No document name");
            docName = "";
        }
        this.updateDoc("no-id", docName, "Write here...");
    }

    updateInputValue(evt) {
        this.setState({inputfield: evt.target.value});
    }

    componentWillUnmount() {
        this.isScreenMounted.current = false;
    }

    render() {
        const token = this.getToken();

        if (token) {
            const { data } = this.state;

            if (!data) {
                return (
                    <p>Loading...</p>
                );
            }

            if (data === undefined || data.errors) {
                return <Login myData={this.state} setToken={this.setToken} />;
            }

            if ( data.doc_owner === undefined || data.allowed_docs === undefined ) {
                return (
                    <p>Loading...</p>
                );
            }
            return (
                <div className="Index-page">
                    <h1>Welcome</h1>
                    <p className="Log-info">Logged in as: {data.email} </p>
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
                    <div key={data.email}>
                        <p><b> Owns documents: </b></p>
                        { data.doc_owner.length ? data.doc_owner.map(doc =>
                            <div key={doc._id}>
                                <i> {doc.name} </i>
                                <Link
                                    to="/editor"
                                    className="Edit-link"
                                    onClick={() =>
                                        this.updateDoc(doc._id, doc.name, doc.content)}>
                                        &#9998;
                                </Link>
                            </div>
                        ) : "owns no documents"}
                        <p><b> Can edit documents: </b></p>
                        { data.allowed_docs.length ? data.allowed_docs.map(doc =>
                            <div key={doc.name}>
                                <i> {doc.name} </i>
                                <Link
                                    to="/editor"
                                    className="Edit-link"
                                    onClick={() =>
                                        this.updateDoc(doc._id, doc.name, doc.content)}>
                                        &#9998;
                                </Link>
                            </div>
                        ) : "has no allowed documents"}
                    </div>
                </div>
            );
        } else {
            return <Login myData={this.state} setToken={this.setToken} />;
        }
    }
}

export default Home;
