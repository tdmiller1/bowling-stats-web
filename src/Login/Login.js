import React, { Component } from 'react';
import App from '../App';
import Profile from '../Profile';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import LandingPage from './LandingPage';
import { Hidden } from '@material-ui/core';

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

class Login extends Component {

  state = {
    email: localStorage.getItem('email') !== null ? localStorage.getItem('email').slice(1,localStorage.getItem('email').length-1) : null,
    profile: false,
    width:window.innerWidth,
    left:false
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }
  
  handleProfile = () => {
    this.setState({profile: !this.state.profile, left: false})
  }
  
  toggleDrawer = (side, open) => () => {
    if(this.state.profile){
      this.setState({
        profile: false,
        left: open
      });
    }else{
      this.setState({
        left: open
      });
    }
     
  };

  render() {
    const {classes} = this.props
    const { isAuthenticated } = this.props.auth;
    const cursor = {cursor:"pointer",margin:"10px"}
    return (
      <div>
        {
          isAuthenticated() &&
          <div>
            <div className="header" >
              <AppBar position='static'>
              <Toolbar>
                <Hidden only={["md","lg","xl"]}>
                
                  <IconButton color='inherit' onClick={this.toggleDrawer('left', true)}>
                    <AddCircleIcon></AddCircleIcon>
                  </IconButton>
                  
                </Hidden>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Bowling Stats
                </Typography>
              { !this.state.profile ? (
                <IconButton title="Profile" color="inherit" style={cursor} className="auth-button" onClick={this.handleProfile}>
                  <AccountBoxIcon></AccountBoxIcon>
                </IconButton> ) : (
                  <IconButton color='inherit' onClick={() => {this.toggleDrawer('left', false); this.handleProfile()}}>
                    <DashboardIcon></DashboardIcon>
                  </IconButton>
                )
                }
                <IconButton title="Logout" color="inherit" style={cursor} className="auth-button" onClick={this.logout} >
                  <ExitToAppIcon></ExitToAppIcon>
                </IconButton>
                
                </Toolbar>
              </AppBar>
            </div>
            {
              this.state.profile ? (<Profile></Profile>) : <App openDrawer={this.state.left} email={this.state.email} />
            }
        </div>
        }
        {
          !isAuthenticated() && (
            <div>
              <LandingPage callback={this.login} />
            </div>
          )
        }
      </div>
      );
    }
  }

  export default withStyles(styles)(Login);
