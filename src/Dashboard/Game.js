import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../index.css';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from '@material-ui/core/Typography';
import {
  IconButton} from '@material-ui/core'


  const styles = theme => ({
      cellText:{
        fontSize:14,
        [theme.breakpoints.up('md')]: {
          fontSize:15
      },
      icon:{
        margin:'0px',
        padding:'0px',
        cursor:'pointer'
      }
    },
  });

class Game extends Component {

  state = {
    host:""
  }

  parseDate(){
    var date = moment(this.props.date).format('MMMM DD, YYYY');
    return date
  }

  componentDidMount(){
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"})
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"})
    }
  }

  async delete(){
    var url = this.state.host + '/games'
    console.log(this.props)
    const response = await axios.delete(url,{
        data: {
            id: this.props.id,
            playerId: this.props.playerId
        }
    })
    if(response){
      this.props.callback()
    }
  }
  render() {
    const {classes} = this.props
    return (
      <TableRow className={classes.tableRow} key={this.props._id}>
        <TableCell className={classes.tableCell} align="center">
          <Typography className={classes.cellText} variant="h6" gutterBottom>
            {this.props.score}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography className={classes.cellText} variant="h6" gutterBottom>
            {this.parseDate()}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton className={classes.icon} title="Delete" color="secondary" align="center" onClick={() => this.delete()}>
              <DeleteIcon className={classes.icon}></DeleteIcon>
          </IconButton>
          </TableCell>
      </TableRow>
      )
    }
  }

  export default withStyles(styles)(Game);
