import React, { Component } from "react";

import ChargingStation from "./chargingStation";
import Grid from "@material-ui/core/Grid";

class ChargingStations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  render() {
    return (
      <Grid
        container
        alignItems="stretch"
        spacing={24}
      >
        {this.props.stations.map((item) => {
          return (
            <Grid item xs={4}>
              <ChargingStation station={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default ChargingStations;
