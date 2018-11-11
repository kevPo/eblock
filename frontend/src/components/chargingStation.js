import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router'

import { withStyles } from "@material-ui/core/styles";
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
  smallHeading: {
    color: theme.palette.text.secondary,
    fontWeight: "800",
    fontSize: ".75em",
    textTransform: "uppercase"
  },
  largeHeading: {
    fontWeight: "800",
    marginBottom: "0"
  },
  rating: {
    width: ".75em",
    color: "#cccccc"
  },
  status: {
    justifyContent: "flex-end"
  }
});

class ChargingStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charging: false
    };
  }

  plugIn() {
    // this.props.router.push(`/something/${this.props.station.id}`)
    // browserHistory.push(`/charging/${this.props.station.id}`);
    console.log(this.props.history)
  }

  render() {
    const { classes } = this.props;
    const { charging } = this.state
    // TODO: Get this data in the ledger
    let activityStatus = this.props.station.available ? 'Available for the last 4 hours' : 'Unavailable for the last 2 hours'
    let stars = [];
    let emptyStars = [];

    for (var i=0; i<this.props.station.rating; i++) {
      stars.push(<StarIcon className={classes.rating} />);
    }

    for (var i=0; i<5 - this.props.station.rating; i++) {
      emptyStars.push(<StarBorderIcon className={classes.rating} />);
    }

    if (charging) {
      return <Redirect to={`/charging/${this.props.station.id}`} push={true} />
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.station.image}
            title={this.props.station.name}
          />
          <CardContent >
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="headline"
                  className={classes.largeHeading}
                  component="h2"
                >
                  {this.props.station.name}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography className={classes.smallHeading} component="p">
                  {this.props.station.chargerType} - {this.props.station.kilowatts} kWh
                </Typography>
                <div>
                  {stars}
                  {emptyStars}
                </div>
                <Typography className={classes.smallHeading} style={{ width: '75%', color: this.props.station.available ? "" : "#e83a30"}} component="p">
                  {activityStatus}
                </Typography>
              </Grid>
              <Grid item xs={2} container justify="flex-end">
                <Grid item container alignItems="center" direction="column">
                  <Grid item>
                    <EvStationIcon
                      style={{ color: this.props.station.available ? "#26d269" : "#cccccc", fontSize: "3em" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="button"
                      className={classes.smallHeading}
                      component="p"
                      style={{
                        fontSize: ".6em",
                        color: this.props.station.available ? "#26d269" : "#cccccc",
                        marginTop: "-3px"
                      }}
                    >
                      {this.props.station.available ? 'Available' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="medium" color="primary" onClick={() => this.setState({ charging: true })} disabled={!this.props.station.available}>
              Plug In Now
            </Button>
            <Button>
              Read More
            </Button>
            
            {/* <Button size="small" color="primary">
              Learn More
            </Button> */}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ChargingStation);
