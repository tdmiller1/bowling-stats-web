import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../index.css';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from '@material-ui/core/Typography';
import {
  IconButton} from '@material-ui/core'

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
    const cursor = {cursor:"pointer",margin:"10px"}
    return (
      <TableRow key={this.props._id}>
        <TableCell align="center">
          <Typography variant="h6" gutterBottom>
            {this.props.score}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h6" gutterBottom>
            {this.parseDate()}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton title="Delete" color="secondary" align="center" style={cursor} onClick={() => this.delete()}>
              <DeleteIcon></DeleteIcon>
          </IconButton>
          </TableCell>
      </TableRow>
      )
    }
  }

  export default Game;
