import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from '../components/home';
import Charging from '../components/charging';
import Navbar from '../components/navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#e83a30',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});
class Index extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/charging/:id" component={Charging}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

}

export default Index;
