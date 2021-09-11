import './Toolbar.css';


const Toolbar = (props) => {
    function handleClick() {
        // when Save-button is clicked, print editors text to console
        console.log("Doc name: " + props.currDocName);
        console.log(props.editorTxt);
        // console.log(props.editorHtml);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify({ name: props.currDocName, content: props.editorTxt })
        };
        fetch('https://jsramverk-editor-emeu17.azurewebsites.net/docs', requestOptions)
        .then(function(result) {
            console.log(result);
        });
    }

    // fetchData = () => {
    //
    // }
    return (
        <div className="Toolbar">
            <button className="Save-button" onClick={() => handleClick()}> Save </button>
        </div>
    );
}

export default Toolbar;
