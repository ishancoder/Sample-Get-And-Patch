import React from "react";
import Input from "../Input/Input";
import axios from "axios";
import "./GooglePlacesInput.css";

export default class GooglePlacesInput extends React.Component {
    constructor() {
        super();
        this.state = {queryString: "", data: []};
    }

    fetchResults(event) {
        this.setState({...this.state, queryString: event.target.value})
        axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ event.target.value + "&radius=100000&key=AIzaSyBfBcNOvqKxqWV-utwsWL41RAS_q-m9NuQ")
        .then((data)=>{
            data = data.results.map((dataObject)=>{dataObject.formatted_address});
            this.setState({...this.state, data: [...data]});
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    render() {
        let locations = [];
        locations = this.state.data.forEach((data, i)=><li key={i}>{data}</li>)
        return (
            <div >
                <Input label="Places" type="text" value={this.state.queryString} handleChange={this.fetchResults.bind(this)}/>
                <div>
                    {locations}
                </div>
            </div>
        );
    }
}