import React, { Component } from 'react';

import './Register.css';

class Login extends Component {
    render() {
        return (
            <div className="Index-page">
                <h1>Login</h1>
                <form>
                    <label className="input-label">Email</label>
                    <input className="input" type="email" id="email" />

                    <label className="input-label">Password</label>
                    <input className="input" type="password" id="pwd" />

                    <input type="submit" value="Login" className="Reg-btn"/>
                </form>
            </div>
        );
    }
}

export default Login;
