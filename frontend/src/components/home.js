import React, { Component } from "react";
import PropTypes from "prop-types";

import ChargingStations from "./chargingStations";
import MapContainer from "./mapContainer";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  header: {
    padding: theme.spacing.unit * 2,
    fontWeight: 800
  },
  map: {
    position: "static"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      },
      localStations: []
    };
  }

  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     let lat = position.coords.latitude
    //     let lng = position.coords.longitude
    //     console.log("getCurrentPosition Success " + lat + lng) // logs position correctly
    //     this.setState({
    //       location: {
    //         lat: lat,
    //         lng: lng
    //       }
    //     })
    //   },
    //   (error) => {
    //     // this.props.displayError("Error dectecting your location");
    //     console.error(JSON.stringify(error))
    //   },
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // )

    // TODO: send get for close stations
    this.setState({
      location: {
        lat: 37.782576,
        lng: -122.4092642
      },
      localStations: [
        {
          id: 1,
          name: "Bob's Garage Station",
          lat: 37.778519,
          lng: -122.415838,
          available: true,
          kilowatts: 125,
          rating: 4,
          chargerType: "supercharger",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-1.jpg"
        },
        {
          id: 2,
          name: "My Money Maker",
          lat: 37.759703,
          lng: -122.428093,
          available: false,
          kilowatts: 300,
          rating: 2,
          chargerType: "supercharger",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-2.jpg"
        },
        {
          id: 3,
          name: "Charge It Stop",
          lat: 37.759703,
          lng: -122.428093,
          available: true,
          kilowatts: 300,
          rating: 2,
          chargerType: "supercharger",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-2.jpg"
        },
        {
          id: 4,
          name: "The Hook Up",
          lat: 37.759703,
          lng: -122.428093,
          available: false,
          kilowatts: 300,
          rating: 2,
          chargerType: "J-1772",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-2.jpg"
        },
        {
          id: 5,
          name: "High Volta",
          lat: 37.759703,
          lng: -122.428093,
          available: true,
          kilowatts: 300,
          rating: 2,
          chargerType: "wall",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-2.jpg"
        },
        {
          id: 6,
          name: "Battery Up",
          lat: 37.759703,
          lng: -122.428093,
          available: true,
          kilowatts: 300,
          rating: 2,
          chargerType: "wall",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-2.jpg"
        },
        {
          id: 7,
          name: "Chained To The Wall",
          lat: 37.759703,
          lng: -122.428093,
          available: false,
          kilowatts: 300,
          rating: 2,
          chargerType: "wall",
          image:
            "https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-2.jpg"
        }
      ]
    });
  }

  render() {
    const { classes } = this.props;
    const { location, localStations } = this.state;

    return (
      <div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Typography variant="title" className={classes.header}>
                Charging stations near: {location.lat}, {location.lng}
              </Typography>
              <ChargingStations stations={localStations} />
            </Grid>
            <Grid item xs={4} position="relative">
              <MapContainer locations={localStations} className={classes.map} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
