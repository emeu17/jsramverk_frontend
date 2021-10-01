import React, { Component } from 'react';

import './Register.css';

class Register extends Component {
    render() {
        return (
            <div className="Index-page">
                <h1>Register new user</h1>
                <form>
                    <label className="input-label">Email</label>
                    <input className="input" type="email" id="email" />

                    <label className="input-label">Password</label>
                    <input className="input" type="password" id="pwd" />

                    <input type="submit" value="Register" className="Reg-btn"/>
                </form>
            </div>
        );
    }
}

export default Register;
