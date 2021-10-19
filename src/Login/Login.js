import React, { Component } from 'react';
import { Link }  from "react-router-dom";

import '../Register/Register.css';
import { baseUrl, homepage} from "../vars.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.isScreenMounted = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: "",
            showMessage: false,
            messageCont: ""
        };
    }

    async loginUser(credentials) {
        this.isScreenMounted.current = true;
        return fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(res => {
                if (!this.isScreenMounted.current) {
                    return;
                }
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
            this.setToken(token);
            sessionStorage.setItem('email', JSON.stringify(email));
            window.location.assign(`${homepage}/`);
        } else {
            this.setState({ showMessage: true });
        }
    }

    setToken(token) {
        this.props.setToken(token);
    }

    componentWillUnmount() {
        this.isScreenMounted.current = false;
    }

    render() {
        return (
            <div className="Index-page">
                <h1>Login</h1>
                <span>or: </span>
                <Link to="/register">
                    Register new user
                </Link>
                <form onSubmit={this.handleSubmit}>
                    { this.state.showMessage &&
                            <p className="red-msg">Login failed: {this.state.messageCont}</p>
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
                        <button type="submit" className="Reg-btn">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
