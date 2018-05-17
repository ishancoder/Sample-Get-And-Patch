import React from "react";
import PropTypes from "prop-types";
// import Input from "../Input/Input";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete"
import "./GooglePlacesInput.css";

export default class GooglePlacesInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: props.value || ""};
    }

    handleChange = (address) => {
        this.setState({address});
    }

    handleSelect = (address) => {
        if(this.props.handleSelect) {
            this.props.handleSelect(address);
        }
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .catch(error=> console.log(error));
    }

    render() {
        return (
            <PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect}>
                {({getInputProps, suggestions, getSuggestionItemProps}) => (
                    <div className="location-search-container">
                        <label>City: </label>
                        <input {...getInputProps({placeholder: 'Search Places', className: 'location-search-input'})}/>
                        <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                const style = suggestion.active ? {backgroundColor: "#FAFAFA", cursor: "pointer"}
                                                                 : {backgroundColor: "#FFFFFF", cursor: "pointer"};
                                return (
                                    <div {...getSuggestionItemProps(suggestion, {className, style})}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

GooglePlacesInput.propTypes = {
    handleSelect: PropTypes.func.isRequired,
}