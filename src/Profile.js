import React, { Component } from 'react';

import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });
  

class Profile extends Component {

  state = {
    email: localStorage.getItem('email') !== null ? localStorage.getItem('email').slice(1,localStorage.getItem('email').length-1) : null,
    profile: false,
    profileObj:null,
    user:{
      playerName:"",
      max:-1,
      average:-1,
      id:""
    }
  }

  
  componentWillMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"})
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"})
    }
  }

  componentDidMount(){
    const allGamesUrl = `${this.state.host}/users/find?id=${this.state.email}`;
    axios.get(allGamesUrl).then(response => {
      this.setState({user: response.data.user[0]})
    })
  }

  
  render() {
      const {classes} = this.props
      const container = {textAlign:"center", width:'50%',marginLeft:'25%'}
    return (
      <div style={container}>
       <Paper className={classes.root} elevation={1}>
        <Typography variant="h2" component="h3">
          {this.state.user.playerName !=="" && (this.state.user.playerName)}
        </Typography>
        <Typography variant="h4" component="h3">
          {this.state.user.max !== -1 && ("Max Game Score: " + this.state.user.max)}
        </Typography>
        <Typography variant="h4" component="h3">
          {this.state.user.average !== -1 && ("Average Game Score: " + this.state.user.average)}
        </Typography>
      </Paper>
      </div>
      );
    }
  }

  export default withStyles(styles)(Profile);
