import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import "./charging.css"
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Grid from "@material-ui/core/Grid";
import EvStationIcon from "@material-ui/icons/EvStation";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
});

class Charging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  stopCharging() {
    console.log('hi');
  }

  componentDidMount () {
    // from the path `/inbox/messages/:id`
    var id = this.props.match.params.id
    console.log(id)
  }

  render() {
    const { classes } = this.props;
    // TODO: Get this data in the ledger

    return (
      <Grid container justify="center" alignItems="center" flexGrow='1'>
        <Grid item >
          {/* <div class="battery">
            <div class="liquid"></div>
          </div> */}
          <Button variant="outlined" size="medium" color="primary" onClick={this.stopCharging}>
            Stop Charging
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Charging);
