import React, { Component } from 'react';
import '../Home/Home.css';
import './User.css';
import { baseUrl} from "../vars.js";

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.isScreenMounted = React.createRef();
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        const token = this.getToken();

        this.isScreenMounted.current = true;

        fetch(`${baseUrl}/graphql`, {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                query: `{
                    users {
                        email,
                        _id,
                        doc_owner {
                            name
                        },
                        allowed_docs {
                            name
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
                    this.setState({ data: res.data.users });
                }
            });
    }

    getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        return userToken;
    }

    componentWillUnmount() {
        this.isScreenMounted.current = false;
    }

    render() {
        const { data } = this.state;

        if (data === undefined || data.errors) {
            return (
                <h3>You need to login first</h3>
            );
        }

        return (
            <div>
                <h1>User information</h1>
                {data.map(user =>
                    <div key={user._id}>
                        <h3 className="userHeader"> User: {user.email} </h3>
                        <p><b>Owns documents:</b></p>
                        { user.doc_owner.length ? user.doc_owner.map(doc =>
                            <p key={doc.name}> {doc.name} </p>
                        ) : "none"}
                        <p><b>Can edit documents:</b></p>
                        { user.allowed_docs.length ? user.allowed_docs.map(doc =>
                            <p key={doc.name}> {doc.name} </p>
                        ): "none"}
                    </div>
                )}
            </div>
        );
    }
}

export default UserInfo;
