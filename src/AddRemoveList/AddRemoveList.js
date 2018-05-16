import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import "./AddRemoveList.css";

export default class AddRemoveList extends React.Component {
    
    render() {
        let dataArray = [];
        this.props.data.forEach((data, i)=>{
            dataArray.push(<span key={i} className="chip">{data.name} <button value={i} onClick={this.props.removeData}>x</button></span>)
        });

        return(<div className="add-remove-input">
            <div>
                <span>{dataArray}</span><Input name={this.props.name} type="text" />
            </div>
        </div>);
    }
}

AddRemoveList.propTypes = {
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    removeData: PropTypes.func.isRequired,
};

