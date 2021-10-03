import React, { Component } from 'react';
import { Link }  from "react-router-dom";

import './Register.css';
import { baseUrl} from "./vars.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: "",
            showMessage: false,
            messageCont: ""
        };
    }

    async loginUser(credentials) {
        return fetch(`${baseUrl}/auth/login`, {
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
                    return res.data.token;
                }
                this.setState({messageCont: res.errors.title});
            });
    }

    //handle what happens when user press "Login"
    async handleSubmit(e) {
        e.preventDefault();
        // get email and password from fields
        let email = this.state.email;

        let password = this.state.password;

        //try logging in and getting token
        const token = await this.loginUser({
            email: email,
            password: password
        });

        //if success, save token in sessionStorage
        //else show message why login failed
        if (token) {
            this.setToken(token, email);
        } else {
            this.setState({ showMessage: true });
        }
    }

    setToken(token) {
        this.props.setToken(token);
    }

    render() {
        return (
            <div className="Index-page">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    { this.state.showMessage &&
                            <p className="red-msg">Login failed: {this.state.messageCont}</p>
                    }
                    <label className="input-label">Email</label>
                    <input type="text" onChange={e => this.setState({email: e.target.value})} />
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <div>
                        <button type="submit" className="Reg-btn">Login</button>
                    </div>
                </form>
                <Link to="/register">
                    Register new user
                </Link>
            </div>
        );
    }
}

export default Login;
