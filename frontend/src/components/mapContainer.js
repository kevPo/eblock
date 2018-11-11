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

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Location Name'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}}
          icon={{
            url: "https://res.cloudinary.com/kevpo/image/upload/v1541922938/evfast.png",
            anchor: new google.maps.Point(32,32),
            scaledSize: new google.maps.Size(40,40)
        }}/>
          <Marker
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} icon={{
            url: "https://res.cloudinary.com/kevpo/image/upload/v1541922938/evfast.png",
            anchor: new google.maps.Point(32,32),
            scaledSize: new google.maps.Size(40,40)
        }}/>
          <Marker />
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'xxxxxx'
})(MapContainer);
