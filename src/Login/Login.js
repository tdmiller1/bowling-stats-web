import React, { Component } from 'react';
import App from '../App';
import Profile from '../Profile';
import Leaderboard from '../friends/Leaderboard'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
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
    left:false,
    leaderboard:false,
    shareLink:false
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

  handleLeaderboard = () => {
    this.setState({leaderboard: !this.state.leaderboard, left: false})
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

  handleFacebook(){
    // alert("This is your friend referral link: \n" + this.state.host+"friends?friend="+this.state.email)
    this.setState({shareLink: !this.state.shareLink})
  }

  componentWillMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:4000"})
    } else {
        this.setState({host: "https://bowling-stats-web.herokuapp.com"})
    }
  }

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
                  <Hidden only={["xs","sm"]}>
                    <IconButton color="inherit" href="https://www.facebook.com" target="_blank"><SvgIcon><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/></SvgIcon></IconButton>
                    <IconButton color="inherit" href="https://www.twitter.com" target="_blank"><SvgIcon><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></SvgIcon></IconButton>
                  </Hidden>
                </Typography>
                <Hidden only={["xs","sm"]}>
                  <div>Your Share Link: {this.state.host}/friends?friend={this.state.email}</div>
                </Hidden>
                { !this.state.profile ? (
                <IconButton title="Profile" color="inherit" style={cursor} className="auth-button" onClick={this.handleProfile}>
                  <AccountBoxIcon></AccountBoxIcon>
                </IconButton> ) : (
                  <IconButton color='inherit' onClick={() => {this.toggleDrawer('left', false); this.handleProfile()}}>
                    <DashboardIcon></DashboardIcon>
                  </IconButton>
                )
                }
                { !this.state.leaderboard ? (
                <IconButton color='inherit' onClick={() => this.handleLeaderboard()}>
                    <AssessmentIcon></AssessmentIcon>
                  </IconButton> )
                  : (
                    <IconButton color='inherit' onClick={() => this.handleLeaderboard()}>
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
              this.state.profile ? (<Profile></Profile>) : this.state.leaderboard ? (<Leaderboard></Leaderboard>) : <App openDrawer={this.state.left} email={this.state.email} />
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
