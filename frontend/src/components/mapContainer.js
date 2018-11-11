/*global google*/
import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    console.log('boom');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {    
    let markers = this.props.locations.map((location) => {
      return <Marker
          onClick={this.onMarkerClick}
          title={location.name}
          name={location.name}
          position={{lat: location.lat, lng: location.lng}}
          icon={{
            url: "https://res.cloudinary.com/kevpo/image/upload/v1541936535/circle_ibcdxf.png",
            anchor: new google.maps.Point(40,40),
            scaledSize: new google.maps.Size(40,40)
        }}/>
    });

    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        {markers}
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAnHfFqtmvHP0s7AT67brFz9lNVTR-DzPs'
  // apiKey: 'xxxx'
})(MapContainer);
