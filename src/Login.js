import React, { Component } from 'react';

import './Register.css';
import { baseUrl} from "./vars.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: ""
        };
    }

    async loginUser(credentials) {
        console.log("inside loginuser");
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
                return res.data.token;
            });
    }

    async handleSubmit(e) {
        e.preventDefault();
        // console.log("inside submit");
        let email = this.state.email;

        let password = this.state.password;

        const token = await this.loginUser({
            email: email,
            password: password
        });

        this.setToken(token);
        // this.setState({token: token});
        console.log("token: " + token);
    }

    setToken(token) {
        this.props.setToken(token);
        console.log("setting token");
    }

    render() {
        return (
            <div className="Index-page">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
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
            </div>
        );
    }
}

export default Login;
