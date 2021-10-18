import React, { useRef } from 'react';
import './Toolbar.css';
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
// console.log(location.pathname);
import { ComponentToPrint } from './ComponentToPrint';
import { baseUrl} from "../vars.js";

const Toolbar = (props) => {
    const location = useLocation();
    const componentRef = useRef();

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

        fetch(`${baseUrl}/docs`, requestOptions)
            .then(function(result) {
                console.log(result);
            });
    }

    if (location.pathname === "/editor") {
        return (
            <div className="Toolbar">
                <button className="Save-button" onClick={() => handleClick()}> Save </button>
                <ReactToPrint
                    trigger={() => <button className="Save-button">Print pdf</button>}
                    content={() => componentRef.current}
                />
                <div style={{ display: "none" }}>
                    <ComponentToPrint ref={componentRef} htmlCont={props.editorTxt} />
                </div>
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
