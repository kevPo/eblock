import React, { Component } from "react";
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs
import { TextDecoder, TextEncoder } from 'text-encoding';
import Timer from "./timer";


import { withStyles } from "@material-ui/core/styles";
import "./charging.css"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import BatteryCharging20 from "@material-ui/icons/BatteryCharging20";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import LinearProgress from '@material-ui/core/LinearProgress';

// eosio endpoint
const endpoint = "http://localhost:8888";

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
  {"name":"bob", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"tom", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
  {"name":"alice", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
  {"name":"diane", "privateKey":"5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx", "publicKey":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"},
  {"name":"james", "privateKey":"5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg", "publicKey":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"},
  {"name":"cindy", "privateKey":"5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK", "publicKey":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"},
  {"name":"travis", "privateKey":"5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo", "publicKey":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"}
];

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  }
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

  async stopCharging(location) {
    let user = accounts.find((account) => account.name === 'bob');
    let owner = accounts.find((account) => account.name == location.owner);
    let privateKey = owner.privateKey;

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    console.log(location);
    try {
      const result = await api.transact({
        actions: [{
          account: "locations",
          name: 'endtrans',
          authorization: [{
            actor: location.owner,
            permission: 'active',
          }],
          data: {
            owner: location.owner,
            buyer: user.name,
            location_id: location.key,
            actual_amount: 20
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      console.log(result);
      this.getTable();
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }

    this.transferFunds(location);
  }

  async transferFunds(location) {
    console.log('start transferring funds');
    let user = accounts.find((account) => account.name === 'bob');
    let privateKey = user.privateKey;

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    console.log(location);

    const result = await api.transact({
      actions: [{
        account: "users",
        name: 'pay',
        authorization: [{
          actor: user.name,
          permission: 'active',
        }],
        data: {
          payer: user.name,
          receiver: location.owner,
          token_amount: 20
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    console.log(result);
    this.getTable();
  } catch (e) {
    console.log('Caught exception: ' + e);
    if (e instanceof RpcError) {
      console.log(JSON.stringify(e.json, null, 2));
    }
  }

  async startTransaction() {
    let user = accounts.find((account) => account.name === 'bob');
    let privateKey = user.privateKey;

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    try {
      const result = await api.transact({
        actions: [{
          account: "locations",
          name: 'endtrans',
          authorization: [{
            actor: user.name,
            permission: 'active',
          }],
          data: {
            owner: user.name,
            buyer: user.name,
            location_id: this.state.locationId,
            actual_amount: 20
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      console.log(result);
      this.getTable();
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }

  setLocation(locationId) {
    const rpc = new JsonRpc(endpoint);
    rpc.get_table_rows({
      "json": true,
      "code": "locations",   // contract who owns the table
      "scope": "locations",  // scope of the table
      "table": "locations",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({location: result.rows.find((location) => location.key === locationId)}));
  }

  componentDidMount () {
    var locationId = this.props.match.params.id;
    this.setLocation(locationId)
    this.startTransaction(locationId);
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;
    const battery = '';

    return (
      <Grid container height="500" direction="column" justify="center" alignItems="center">
        <Grid style={{paddingTop: '100px'}} item container justify="center" alignItems="flex-end">
          <BatteryCharging20 style={{fontSize: '20em', color: '#30E877'}} />
        </Grid>
        <Grid item >
          <Button variant="outlined" size="medium" color="primary" onClick={() => this.stopCharging(location)}>
            Stop Charging
          </Button>
        </Grid>
        <Grid item>
          {/* <Timer /> */}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Charging);
