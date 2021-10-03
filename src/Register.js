import React, { Component } from 'react';

import './Register.css';
import { baseUrl} from "./vars.js";

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: "",
            messageCont: "",
            showMessage: false
        };
    }

    async registerUser(credentials) {
        return fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(res => {
                // console.log(res.data.token);
                if (res.data) {
                    return res.data;
                }
                //if login fails, retrieve error message and present
                this.setState({
                    messageCont: res.errors.title,
                    showMessage: true
                });
            });
    }

    //handle what happens when user press "Register"
    async handleSubmit(e) {
        e.preventDefault();
        // get email and password from fields
        let email = this.state.email;

        let password = this.state.password;

        //try registering
        const data = await this.registerUser({
            email: email,
            password: password
        });

        //if success, redirect to homepage
        if (data) {
            window.location.assign("/");
        }
    }

    render() {
        return (
            <div className="Index-page">
                <h1>Register new user</h1>
                <form onSubmit={this.handleSubmit}>
                    { this.state.showMessage &&
                            <p><i>{this.state.messageCont}</i></p>
                    }
                    <label className="input-label">Email</label>
                    <input
                        type="email"
                        className="input"
                        onChange={e => this.setState({email: e.target.value})}
                    />
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        className="input"
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <div>
                        <button type="submit" className="Reg-btn">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
