import React from 'react';
import parse from 'html-react-parser';

export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let myText = '';

        if (this.props.htmlCont) {
            myText = this.props.htmlCont;
        }

        return (
            <div className="pdfCont">
                { parse(myText.toString())}
            </div>
        );
    }
}
