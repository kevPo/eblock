import React, { Component } from "react";
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs
import { TextDecoder, TextEncoder } from 'text-encoding';
import Timer from "./timer";


import { withStyles } from "@material-ui/core/styles";
import "./charging.css"
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

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
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class Receipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      }
    };
  }

  componentDidMount () {
    var userName = this.props.match.params.id;
    let user = accounts.find((account) => account.name == userName);

    
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;

    return (
      // <Grid width="100%" justify="center" className={classes.root}>
      //   <Paper >
      //     <Grid container spacing={16}>
      //       <Grid item>
      //         <ButtonBase className={classes.image}>
      //           <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
      //         </ButtonBase>
      //       </Grid>
      //       <Grid item xs={12} sm container>
      //         <Grid item xs container direction="column" spacing={16}>
      //           <Grid item xs>
      //             <Typography gutterBottom variant="subheading">
      //               Standard license
      //             </Typography>
      //             <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
      //             <Typography color="textSecondary">ID: 1030114</Typography>
      //           </Grid>
      //           <Grid item>
      //             <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
      //           </Grid>
      //         </Grid>
      //         <Grid item>
      //           <Typography variant="subheading">$19.00</Typography>
      //         </Grid>
      //       </Grid>
      //     </Grid>
      //   </Paper>
      // </Grid>
      <Grid container height="500" direction="column" justify="center" alignItems="center">
        <Grid style={{paddingTop: '100px'}} item container justify="center" alignItems="flex-end">
        <Paper >
           <Grid container spacing={16}>
             <Grid item>
               <ButtonBase className={classes.image}>
                 <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
               </ButtonBase>
             </Grid>
             <Grid item xs={12} sm container>
               <Grid item xs container direction="column" spacing={16}>
                 <Grid item xs>
                   <Typography gutterBottom variant="subheading">
                     Standard license
                   </Typography>
                   <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
                   <Typography color="textSecondary">ID: 1030114</Typography>
                 </Grid>
                 <Grid item>
                   <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                 </Grid>
               </Grid>
               <Grid item>
                 <Typography variant="subheading">$19.00</Typography>
               </Grid>
             </Grid>
           </Grid>
         </Paper>
        </Grid>
      </Grid>
      
    );
  }
}

export default withStyles(styles)(Receipts);
