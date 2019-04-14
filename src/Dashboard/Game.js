import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../index.css';

import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
class Game extends Component {


  state = {
    host:""
  }

  parseDate(){
    var date = moment(this.props.date).format('DD-MMM-YYYY');
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
            id: this.props.id
        }
    })
    if(response){
      this.props.callback()
    }
  }
  render() {
    
    return (
      <TableRow key={this.props._id}>
        <TableCell component="th" scope="row">
          <Button onClick={() => this.delete()}>
              Delete
          </Button>
        </TableCell>
        <TableCell align="center">{this.props.score}</TableCell>
        <TableCell align="center">{this.parseDate()}</TableCell>
      </TableRow>
      )
    }
  }

  export default Game;
