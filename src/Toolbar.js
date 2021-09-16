import './Toolbar.css';
import { useLocation } from 'react-router-dom';
// console.log(location.pathname);

const Toolbar = (props) => {
    const location = useLocation();
    function handleClick() {
        //if no document name has been set, return nothing from function
        if (props.currDocName === ""){
            return
        }
        // when Save-button is clicked, print editors text to console
        console.log("Doc name: " + props.currDocName);
        console.log(props.editorTxt);
        console.log("new doc?: " + props.newDoc);
        // console.log(props.editorHtml);
        let requestOptions;
        if (props.newDoc) {
            requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
                },
                body: JSON.stringify({ name: props.currDocName, content: props.editorTxt })
            };
        } else {
            requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
                },
                body: JSON.stringify({ name: props.currDocName, content: props.editorTxt })
            };
        }
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
}

export default Toolbar;
