import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  smallHeading: {
    color: theme.palette.text.secondary,
    fontWeight: '800',
    fontSize: '.75em',
    textTransform: 'uppercase'
  },
  largeHeading: {
    fontWeight: '800',
    marginBottom: '0'
  },
  rating: {
    width: '.75em',
    color: '#FF584E'
  }
});

class ChargingStation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-1.jpg"
            title="Bob's Garage Station"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" className={classes.largeHeading} component="h2">
              Bob's Garage Station
            </Typography>
            <Typography className={classes.smallHeading} component="p">
              Supercharger
            </Typography>
            <div>
              <StarIcon className={classes.rating} />
              <StarIcon className={classes.rating} />
              <StarIcon className={classes.rating} />
              <StarIcon className={classes.rating} />
              <StarBorderIcon className={classes.rating} />
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ChargingStation);