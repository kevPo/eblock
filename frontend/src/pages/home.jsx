import React, { Component } from "react";
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs

import ChargingStations from "../components/chargingStations";
import MapContainer from "../components/mapContainer";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import LocationAutocomplete from '../components/locationAutocomplete';
import './home.css';


const endpoint = "http://localhost:8888";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor:'#222',
    // backgroundColor: '#88F5DF',
    justify: 'center',
    height: '100vh',
    width: '100%',
    paddingTop: '6em'
  },
  textField: {
    padding: '2em'
  }
});
// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     paddingLeft: theme.spacing.unit * 2,
//     paddingRight: theme.spacing.unit * 2
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     textAlign: "center",
//     color: theme.palette.text.secondary
//   },
//   header: {
//     padding: theme.spacing.unit * 3,
//     fontWeight: 800
//   },
//   map: {
//     position: "static"
//   }
// });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toAddress: '',
      showFromAddress: false,
      showButton: false,
      fromAddress:'',
      localStations: []
    };

    this.handleToAddressSelection = this.handleToAddressSelection.bind(this);
    this.handleFromAddressSelection = this.handleFromAddressSelection.bind(this);
  }

  handleToAddressSelection(address) {
    console.log(address);
    this.setState({showFromAddress: true});
  }

  handleFromAddressSelection(address) {
    console.log(address);
    this.setState({showButton: true});
  }
  // getLocations() {
  //   const rpc = new JsonRpc(endpoint);
  //   rpc.get_table_rows({
  //     "json": true,
  //     "code": "locations",   // contract who owns the table
  //     "scope": "locations",  // scope of the table
  //     "table": "locations",    // name of the table as specified by the contract abi
  //     "limit": 100,
  //   // }).then(result => this.setState({ locations: result.rows }));
  //   }).then(result => this.mapToLocations(result.rows));
  // }

  // getRandomTo(highNumber) {
  //   return Math.floor((Math.random() * highNumber) + 1);
  // }

  // mapToLocations(rawLocations) {
  //   console.log(rawLocations);
  //   let localStations = rawLocations.map((location) => {
  //     return {
  //       id: location.key,
  //       lng: location.longitude,
  //       lat: location.latitude,
  //       name: location.name,
  //       available: !location.in_use,
  //       kilowatts: Math.round(location.current_charge),
  //       rating: this.getRandomTo(5),
  //       image: `https://res.cloudinary.com/kevpo/image/upload/v1541903996/house-${this.getRandomTo(4)}.jpg`,
  //       chargerType: 'supercharger',
  //       rate: location.rate_per_kilowatt
  //     }
  //   });
  //   console.log(localStations);
  //   this.setState({ localStations })
  // }

  // componentDidMount() {
  //   this.getLocations();
  // }

  render() {
    const { classes } = this.props;
    const { toAddress, fromAddress, showFromAddress, showButton } = this.state;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid md={6} item  direction="column" alignItems="center" className={classes.container}>
          <h1 className="logo">Blip</h1>
          <LocationAutocomplete label="Where to?" placeholder="Enter destination" address={toAddress} onSelection={this.handleToAddressSelection} />
          { showFromAddress ? <LocationAutocomplete label="From where?" placeholder="Enter starting location" address={fromAddress} onSelection={this.handleFromAddressSelection} /> : <div></div> }
          { showButton ? 
            <div style = {{marginTop: '45px'}}>
              <a href="/results">Find Chargers</a>
            </div> :
            <div></div>
          }
        </Grid>
        <Grid item md={6} backgroundcolor="#ffffff">
          <div className="image-container"></div>
        </Grid>
        
        {/* <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Typography variant="title" className={classes.header}>
                Charging stations near you
              </Typography>
              <ChargingStations stations={localStations} />
            </Grid>
            <Grid item xs={4} position="relative">
              <MapContainer locations={localStations} className={classes.map} />
            </Grid>
          </Grid>
        </div> */}
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
