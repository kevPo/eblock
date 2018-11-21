import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './locationAutocomplete.css';
 
class LocationAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => this.setAddress(address))
      // .then(results => getLatLng(results[0]))
      // .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  setAddress(address) {
    this.props.onSelection(address);
  }
 
  render() {
    return (
      
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div  style={{marginBottom: '20px'}} >
            <p className="location-label">{ this.props.label }</p>
            <input
              {...getInputProps({
                placeholder: this.props.placeholder,
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#88F5DF', color: '#222', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', color: '#222', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
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

export default LocationAutocomplete;