import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login  from '../Login';

import { UserAction } from '../../actions';
import { ApiService } from '../../services';
import Home from '../../pages/home';
// import Results from './results';
// import Charging from '../components/charging';
// import Receipts from '../components/receipts';
// import Navbar from '../components/navbar';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: '#e83a30',
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       light: '#0066ff',
//       main: '#0044ff',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#ffcc00',
//     },
//     // error: will use the default color
//   },
// });
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getCurrentUser();
  }

  getCurrentUser() {
    // Extract setUser of UserAction from redux
    const { setUser } = this.props;
    // Send a request to API (blockchain) to get the current logged in user
    return ApiService.getCurrentUser()
      // If the server return a username
      .then(username => {
        // Save the username to redux store
        // For structure, ref: ./frontend/src/reducers/UserReducer.js
        setUser({ name: username });
      })
      // To ignore 401 console error
      .catch(() => {})
      // Run the following function no matter the server return success or error
      .finally(() => {
        // Set the loading state to false for displaying the app
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;
    const { user: { name, game } } = this.props;

    // Determine the app status for styling
    let appStatus = "login";
    if (game && game.status !== 0) {
      appStatus = "game-ended";
    } else if (game && game.selected_card_ai > 0) {
      appStatus = "card-selected";
    } else if (game && game.deck_ai.length !== 17) {
      appStatus = "started";
    } else if (name) {
      appStatus = "profile";
    }

    // Set class according to loading state, it will hide the app (ref to css file)
    // If the username is set in redux, display the Game component
    // If the username is NOT set in redux, display the Login component
    return (
      <div className={ `App status-${ appStatus }${ loading ? " loading" : "" }` }>
        { name && <Home /> }
        { !name && <Login /> }
      </div>
    );
    // return (
    //   <MuiThemeProvider theme={theme}>
        {/* <Navbar /> */}
        {/* <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/results" component={Results}/>
            <Route exact path="/receipts" component={Receipts}/>
            <Route path="/charging/:id" component={Charging}/>
          </div>
        </Router> */}
    //   </MuiThemeProvider>
    // );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(App);
