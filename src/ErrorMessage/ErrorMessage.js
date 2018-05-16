import React from "react";
import "./ErrorMessage.css";

export default class ErrorMessage extends React.Component {
    render() {
        return (
            <div className="error-container">
                <h1>Something went wrong !</h1>
                <pre className="error">{this.props.message}</pre>
            </div>
        )
    }
}