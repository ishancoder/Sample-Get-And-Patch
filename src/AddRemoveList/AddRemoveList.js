import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./AddRemoveList.css";

export default class AddRemoveList extends React.Component {
    constructor() {
        super();
        this.state = {inputVal: "", data: null};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {...prevState, data: [...nextProps.data]};
    }

    onAdd(event) {
        event.preventDefault();
        if(this.state.inputVal === null || this.state.inputVal.length === 0) {
            return;
        }
        let arr = [...this.state.data, {
            "option": "preferred",
            "level": 0,
            "id": 3122,
            "name": this.state.inputVal,
            "matching_with_opportunity": null,
        }];
        this.setState({inputVal: "", data: arr});
        if(this.props.onChange) {
            this.props.onChange(arr);
        }
    }

    handleChange(event) {
        this.setState({...this.state, inputVal: event.target.value});
    }

    onRemove(event) {
        event.preventDefault();
        let arr = [...this.state.data];
        arr.splice(event.target.value, 1);
        this.setState({data: [...arr]});
        if(this.props.onChange) {
            this.props.onChange(arr);
        }
    }
    
    render() {
        let dataArray = [];
        this.state.data.forEach((data, i) => {
            dataArray.push(<span key={i} className="chip">{data.name} <span value={i} onClick={this.onRemove.bind(this)}>x</span></span>)
        });

        return (<div className="add-remove-input">
            <form onSubmit={this.onAdd.bind(this)}>
                <Input ref={this.textInput} value={this.state.inputVal} label={this.props.label} type="text" handleChange={this.handleChange.bind(this)} />
                {/* <Button text="ADD" handleClick={this.onAdd.bind(this)}/> */}
                <div className="data-field">
                    <span>{dataArray}</span>
                </div>
            </form>
        </div>);
    }
}

AddRemoveList.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

