import React, { Component } from 'react';
import '../Home/Home.css';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch('https://jsramverk-editor-emeu17.azurewebsites.net/list')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        const { data } = this.state;

        // console.log( {data} );
        return (
            <div>
                <h1>List of documents</h1>
                {data.map(doc =>
                    <div key={doc._id}>
                        <p> {doc.name} </p>
                    </div>
                )}
            </div>
        );
    }
}

export default List;
