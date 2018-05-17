import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import AddRemoveList from "../AddRemoveList/AddRemoveList";
import GooglePlacesInput from "../GooglePlacesInput/GooglePlacesInput";
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

    logState() {
        console.log(this.state);
    }

    handleChange(event) {
        switch(event.target.name) {
            case "opportunity_name":
                this.setState({...this.state, title: event.target.value})
                break;
            case "description":
                break;
            case "salary":
                break;
            case "selection_process":
                break;
            case "earliest_start_date":
                console.log(event.target.value);
                break;
            case "latest_end_date":
                break;
            case "skill_array":
                break;
            default:
                break;
        }
    }

    skillsChange(data) {
        this.setState({...this.state, skills: [...data]});
    }

    backgroundsChange(data) {
        this.setState({...this.state, backgrounds: [...data]});
    }

    render() {
        const applicationCloseDate = moment(this.state.applications_close_date).format("YYYY-MM-DD");
        const earliestStartDate = moment(this.state.earliest_start_date).format("YYYY-MM-DD");
        const latestEndDate = moment(this.state.latest_end_date).format("YYYY-MM-DD");
        return (
            <div>
                <Input label="Opportunity Title" value={this.state.title} name="opportunity_name" type="text" handleChange={this.handleChange.bind(this)}/>
                <Input label="Description" value={this.state.description} name="description" type="text" handleChange={this.handleChange.bind(this)}/>
                <Input label="Salary" value={this.state.specifics_info.salary} name="salary" type="number" handleChange={this.handleChange.bind(this)}/>
                <AddRemoveList name="skill_array" label="Skills" data={this.state.skills} onChange={this.skillsChange.bind(this)}/>
                <AddRemoveList name="background_array" label="Backgrounds" data={this.state.backgrounds} onChange={this.backgroundsChange.bind(this)} />
                <GooglePlacesInput />
                <Input label="Close Date" value={applicationCloseDate} name="close_date" type="date" handleChange={this.handleChange.bind(this)}/>
                <Input label="Earliest Start Date" value={earliestStartDate}  name="earliest_start_date" type="date" handleChange={this.handleChange.bind(this)}/>
                <Input label="Latest End Date" value={latestEndDate}  name="latest_end_date" type="date" handleChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

EditCard.propTypes = {
    data: PropTypes.object.isRequired
}