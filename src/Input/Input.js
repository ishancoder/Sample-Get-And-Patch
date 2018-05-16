import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

export default class Input extends React.Component {
    render() {
        return(
            <div className="text-input-container">
                <label>{this.props.label}</label> : 
                <input className="text-input-custom" value={this.props.value} placeholder={this.props.placeholder} name={this.props.name} type={this.props.type} onChange={this.props.handleChange}/>
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.oneOf(["text", "number", "date"]).isRequired,
    name: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};