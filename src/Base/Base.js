import React from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../Button/Button";
import EditCard from "../EditCard/EditCard";
import axios from "axios";
import "./Base.css";

export default class Base extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: true,
            hasError: false,
            editEnabled: false,
        };
    }

    componentDidMount() {
        axios.get("http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/6124?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c")
        .then((response) => {
            this.setState({...this.state, data: response.data, isLoading: false, hasError: false});
        })
        .catch((error) => {
            this.setState({
                ...this.state,
                data: null,
                isLoading: false,
                hasError: true,
                errorMessage: error.toString(),
            });
        });
    }

    handleClick(event) {
        this.setState({...this.state, editEnabled: true});
    }

    onSave(newData) {
        this.setState({...this.state, data: newData, editEnabled: false});
    }

    render() {
        if(this.state.isLoading) {
            return (
                <Loader/>
            )
        }

        if(this.state.hasError) {
           return (
               <ErrorMessage message={this.state.errorMessage}/>
           );
        }

        if(this.state.editEnabled) {
            return <EditCard data={this.state.data} onSave={this.onSave.bind(this)}/>
        }

        const date = new Date(this.state.data.applications_close_date);
        return (
            <div className="base">
                <div className="header">
                    <span className="title">{this.state.data.title}</span>
                    <span className="close-date"><strong>Closing on</strong> <br/>{date.toDateString()}</span>
                    <span className="description">{this.state.data.description}</span>
                    <span className="location">{this.state.data.role_info.city}</span>
                </div>
                <div className="content">
                    <section>
                        <span className="heading-text">BACKGROUNDS</span>
                        <div>{this.state.data.backgrounds.map((background)=>{return background.name}).join(", ")}</div>
                    </section>
                    <section>
                        <span className="heading-text">SKILLS REQUIRED</span>
                        <div>{this.state.data.skills.map((skill)=>(skill.name)).join(", ")}</div>
                    </section>
                    <section>
                        <span className="heading-text">SALARY</span>
                        <div>{this.state.data.specifics_info.salary_currency.symbol}{this.state.data.specifics_info.salary}</div>
                    </section>
                    <section>
                        <span className="heading-text">SELECTION PROCESS</span>
                        <div>{this.state.data.role_info.selection_process}</div>
                    </section>
                    <section className="date-container">
                        <div>
                            <span className="sub-heading-text">EARLIEST START DATE</span>
                            <div>{new Date(this.state.data.earliest_start_date).toDateString()}</div>
                        </div>
                        <div>
                            <span className="sub-heading-text">LATEST END DATE</span>
                            <div>{new Date(this.state.data.latest_end_date).toDateString()}</div>
                        </div>
                    </section>
                    <Button text="EDIT" handleClick={this.handleClick.bind(this)}/>
                </div>
            </div>
        );
    }
}