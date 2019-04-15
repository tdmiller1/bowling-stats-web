import React, { Component } from 'react';
import App from '../App';
import Profile from '../Profile';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  ListItemIcon, ListItem} from '@material-ui/core'
import Button from '@material-ui/core/Button'

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
    width:window.innerWidth
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }
  
  handleProfile = () => {
    this.setState({profile: !this.state.profile})
  }

  render() {
    const {classes} = this.props
    const { isAuthenticated } = this.props.auth;
    const cursor = {cursor:"pointer",margin:"10px"}
    return (
      <div>
        {
          isAuthenticated() && this.state.width > 700  &&
          <div>
            <div className="header" >
              <AppBar position='static'>
              <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Bowling Stats
                </Typography>

                <IconButton title="Profile" color="inherit" style={cursor} className="auth-button" onClick={this.handleProfile}>
                  <AccountBoxIcon></AccountBoxIcon>
                </IconButton>

                <IconButton title="Logout" color="inherit" style={cursor} className="auth-button" onClick={this.logout} >
                  <ExitToAppIcon></ExitToAppIcon>
                </IconButton>
                
                </Toolbar>
              </AppBar>
            </div>
            {console.log(this.props)}
            {
              this.state.profile ? (<Profile></Profile>) : <App email={this.state.email} />
            }
        </div>
        }
        {
          !isAuthenticated() && this.state.width > 700 && (
            <div className="container column">{' '}
            <h1>Log in to start tracking your Bowling Games!</h1>
                <div 
                    style={{ cursor: 'pointer', color:'white' }}
                    onClick={this.login} 
                    className="login-center">
                        Log In
                    {' '}
                </div>
            </div>
          )
        }
        
        {this.state.width <= 700 && (
          <div>
            <h1>Please use larger browser</h1>
            <p>Or download the app</p>
          </div>
        )}
      </div>
      );
    }
  }

  export default withStyles(styles)(Login);
