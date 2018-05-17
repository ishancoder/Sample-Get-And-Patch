import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
    render() {
        return <button name={this.props.name} className="custom-action-button" onClick={this.props.handleClick}>{this.props.text}</button>
    }
}

Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    name: PropTypes.string,
};