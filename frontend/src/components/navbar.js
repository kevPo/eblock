import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="title" color="inherit" className={classes.grow}>
            EBlock
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// class Navbar extends Component {
//   render() {
//     return (
//     <AppBar position="static" color="default">
//       <Toolbar>
//         <Typography variant="title" color="inherit">
//             The winning app
//         </Typography>
//       </Toolbar>
//     </AppBar>
//       <nav>
//         <ul className="container">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/addCountry">Add Country</Link></li>
//           <li><Link to="/addState">Add State</Link></li>
//         </ul>
//       </nav>
//     );
//   }
// }

// export default Navbar;