import React, { Component } from 'react';
import '../Home/Home.css';
import { baseUrl} from "../vars.js";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch(`${baseUrl}/graphql`, {
            method: 'POST',

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `{
                    users {
                        email
                    }
                }`
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.users);
                this.setState({ data: res.data.users });
            });
    }

    render() {
        const { data } = this.state;

        // console.log( {data} );
        return (
            <div>
                <h1>User information</h1>
                {data.map(user =>
                    <div key={user.email}>
                        <p> {user.email} </p>
                    </div>
                )}
            </div>
        );
    }
}

export default UserInfo;
