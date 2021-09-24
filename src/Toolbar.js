import React from 'react';
import './Toolbar.css';
import { useLocation } from 'react-router-dom';
// console.log(location.pathname);

const Toolbar = (props) => {
    const location = useLocation();

    function handleClick() {
        // when Save-button is clicked, update doc in mongodb
        // console.log("id: " + props.docId);
        // console.log("new text: " + props.editorTxt);
        if (props.currDocName === "") {
            console.log("no document name specified, will not save");
            return;
        }

        let requestOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify({ _id: props.docId, content: props.editorTxt })
        };

        // fetch('http://localhost:1337/docs', requestOptions)
        fetch('https://jsramverk-editor-emeu17.azurewebsites.net/docs', requestOptions)
            .then(function(result) {
                console.log(result);
            });
    }
    if (location.pathname === "/editor") {
        return (
            <div className="Toolbar">
                <button className="Save-button" onClick={() => handleClick()}> Save </button>
            </div>
        );
    } else {
        return (
            <div className="Toolbar">
            </div>
        );
    }
};

export default Toolbar;
