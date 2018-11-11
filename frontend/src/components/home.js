import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/navbar';
import ChargingStation from './chargingStation';
import MapContainer from './mapContainer';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    padding: theme.spacing.unit * 2,
    fontWeight: 800
  },
  map: {
    position: 'relative'
  }
});

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        console.log("getCurrentPosition Success " + lat + lng) // logs position correctly
        this.setState({
          location: {
            lat: lat,
            lng: lng
          }
        })
      },
      (error) => {
        // this.props.displayError("Error dectecting your location");
        console.error(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;

    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8} >
              <Typography variant="title" className={classes.header}>
                Charging stations near: {location.lat}, {location.lng}
              </Typography>
              <ChargingStation />
            </Grid>
            <Grid item xs={4}>
              <MapContainer className={classes.map}/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);