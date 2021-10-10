import React, { Component } from 'react';
import '../Home/Home.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.isScreenMounted = React.createRef();
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.isScreenMounted.current = true;
        fetch('https://jsramverk-editor-emeu17.azurewebsites.net/list')
            .then(response => response.json())
            .then(data => {
                if (!this.isScreenMounted.current) {
                    return;
                }
                this.setState({ data });
            });
    }

    componentWillUnmount() {
        this.isScreenMounted.current = false;
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
