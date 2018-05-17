import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import AddRemoveList from "../AddRemoveList/AddRemoveList";
import GooglePlacesInput from "../GooglePlacesInput/GooglePlacesInput";
import Button from "../Button/Button";
import moment from "moment";
import "./EditCard.css";

export default class EditCard extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, oldState) {
        return {...nextProps.data};
    }

    handleChange(event) {
        switch(event.target.name) {
            case "opportunity_name":
                if(event.target.value.length > 100) {
                    alert("Title cannot be longer that 100 characters");
                    return;
                }
                this.setState({...this.state, title: event.target.value})
                break;
            case "description":
                this.setState({...this.state, description: event.target.value});
                break;
            case "salary":
                this.setState({...this.state, specifics_info:{...this.state.specifics_info, salary: event.target.value}});
                break;
            case "selection_process":
                this.setState({...this.state, role_info: {...this.state.role_info, selection_process: event.target.value}});
                break;
            case "close_date":
                let closeDate = new Date(event.target.value);
                let currentDate = new Date();
                let thirtyDaysInMillis = 30*24*60*60*1000;
                let nintyDaysInMillis = 90*24*60*60*1000;
                if(closeDate.getTime() - currentDate.getTime() > nintyDaysInMillis) {
                    alert("Close Date can't be more than 90 days from current day.");
                    return;
                }
                if(currentDate.getTime() - closeDate.getTime() > thirtyDaysInMillis) {
                    alert("Close Date can't be less than 30 days from current day.");
                    return;
                }
                this.setState({...this.state, applications_close_date: closeDate.toISOString()});
                break;
            case "earliest_start_date":
                let startDate = new Date(event.target.value);
                console.log(startDate.toISOString());
                break;
            case "latest_end_date":
                let endDate = new Date(event.target.value);
                console.log(endDate.toISOString());
                break;
            case "skill_array":
                break;
            case "save":
                this.props.onSave(this.state);
                break;
            default:
                break;
        }
    }

    skillsChange(data) {
        this.setState({...this.state, skills: [...data]});
        return true;
    }

    backgroundsChange(data) {
        if(data.length > 3) {
            alert("A maximum of 3 backgrounds can be set.");
            return false;
        }
        this.setState({...this.state, backgrounds: [...data]});
        return true;
    }

    handleSelect(address) {
        let rInfo = {...this.state.role_info};
        rInfo.city = address;
        this.setState({...this.state, role_info: rInfo});
    }

    log = () => (console.log(this.state.applications_close_date));

    render() {
        const applicationCloseDate = moment(this.state.applications_close_date).format("YYYY-MM-DD");
        const earliestStartDate = moment(this.state.earliest_start_date).format("YYYY-MM-DD");
        const latestEndDate = moment(this.state.latest_end_date).format("YYYY-MM-DD");
        return (
            <div>
                <Input label="Opportunity Title" value={this.state.title} name="opportunity_name" type="text" handleChange={this.handleChange.bind(this)}/>
                <Input label="Description" value={this.state.description} name="description" type="text" handleChange={this.handleChange.bind(this)}/>
                <Input label="Salary" value={this.state.specifics_info.salary} name="salary" type="number" handleChange={this.handleChange.bind(this)}/>
                <Input label="Selection Process" value={this.state.role_info.selection_process} name="selection_process" type="text" handleChange={this.handleChange.bind(this)} />
                <AddRemoveList placeholder="Enter a skill and press enter" name="skill_array" label="Skills" data={this.state.skills} onChange={this.skillsChange.bind(this)}/>
                <AddRemoveList placeholder="Enter background and press enter" name="background_array" label="Backgrounds" data={this.state.backgrounds} onChange={this.backgroundsChange.bind(this)} />
                <GooglePlacesInput value={this.state.role_info.city} handleSelect={this.handleSelect.bind(this)} />
                <Input label="Close Date" value={applicationCloseDate} name="close_date" type="date" handleChange={this.handleChange.bind(this)}/>
                <Input label="Earliest Start Date" value={earliestStartDate}  name="earliest_start_date" type="date" handleChange={this.handleChange.bind(this)}/>
                <Input label="Latest End Date" value={latestEndDate}  name="latest_end_date" type="date" handleChange={this.handleChange.bind(this)}/>
                {/* <button onClick={this.log}>LOG</button> */}
                <Button text="SAVE" name="save" handleClick={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

EditCard.propTypes = {
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
}