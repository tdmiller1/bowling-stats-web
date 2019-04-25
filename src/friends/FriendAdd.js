import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

class FriendAdd extends Component {

    state = {
        email: localStorage.getItem('email') !== null ? localStorage.getItem('email').slice(1,localStorage.getItem('email').length-1) : null,
        friendId: null,
        host:null
    }

    
  componentWillMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"})
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"})
    }
  }

    addFriend(){
        const putUrl = `${this.state.host}/users/add/friends?id=${this.state.email}&friend=${this.state.friendId}`;
        axios.put(putUrl)
        window.location = '/'
    }
    
  componentDidMount(){
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"}, () => {
            var friendId = getUrlVars()["friend"]
            this.setState({friendId:friendId})
        })
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"}, () => {

        })
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
          {isAuthenticated() ?  (this.addFriend()) :this.props.auth.login(this.state.friendId)}
      </div>
      )
    }
  }

  export default FriendAdd;
