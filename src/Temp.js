import React from 'react';

import './Editor.css';


const Temp = (props) => {
    return (
        <div>
            <p>Current doc: { props.data.currDocName}</p>
        </div>
    );
};

export default Temp;
