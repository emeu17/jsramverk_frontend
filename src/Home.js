import React, { Component } from 'react';
import { Link }  from "react-router-dom";

import './Home.css';
import { baseUrl} from "./vars.js";

import Login from './Login';

class Home extends Component {
    constructor(props) {
        super(props);
        this.updateDoc = this.updateDoc.bind(this);
        this.newDoc = this.newDoc.bind(this);
        this.setToken = this.setToken.bind(this);
        // this.getDocs = this.getDocs.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.login = false;
        this.state = {
            data: [],
            token: ""
        };
    }

    componentDidMount() {
        const token = this.getToken();

        if (token) {
            fetch(`${baseUrl}/docs`, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ data });
                    // console.log(data);
                    // return data;
                });
        }
    }

    async getDocs(token) {
        return fetch(`${baseUrl}/docs`, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
                // console.log(data);
                // return data;
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

    setToken(userToken, userEmail) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        sessionStorage.setItem('email', JSON.stringify(userEmail));
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

    // componentWillUnmount() {
    //   this.isSubscribed = false;
    // }

    render() {
        const token = this.getToken();

        if (token) {
            // this.handleDocs(token);
            const { data } = this.state;

            if (data === undefined || data.errors) {
                return <Login myData={this.state} setToken={this.setToken} />;
            }
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
                                    onClick={() =>
                                        this.updateDoc(doc._id, doc.name, doc.content)}>
                                        &#9998;
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            );
        } else {
            return <Login myData={this.state} setToken={this.setToken} />;
        }
    }
}

export default Home;
