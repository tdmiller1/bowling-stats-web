import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
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
      <tr>
        <td>
          <button onClick={() => this.delete()}>
              Delete
          </button></td>
        <td>{this.props.score}</td>
        <td>{this.parseDate()}</td>
      </tr>
      )
    }
  }

  export default Game;
