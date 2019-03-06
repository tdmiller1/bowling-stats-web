import React, { Component } from 'react';
import Game from './Dashboard/Game';

class App extends Component {

  constructor(props){
    super(props)
        this.state = {
          games:[],
          email:"",
          gameScore:0,
          date:"",
          host:""
        }
  }

  componentDidMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"})
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"})
    }
    this.pullGames();
  }

  checkEmail = _ => {
    if(localStorage.getItem("email")){
      const email = JSON.parse(localStorage.getItem("email"));
      this.setState({email: email})
      return email
    }else{
      return ""
    }
  }

  pullGames = _ => {
      const email = this.checkEmail();
      var host = ""
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        host = "http://localhost:3001"
      } else {
        host = "https://bowling-stats-server.herokuapp.com"
      }
      if(email != ""){
        const url = `${host}/games/find?id=${email}`;
        fetch(url).then(response => {
          return response.json().then(body => {
            if(response.status === 200){
              this.setState({games: body.games})
            }
          })
        })
      }
  }

  renderGames = ({_id, score, date}) => 
    <Game key={_id}
      score={score}
      date={date} />

    addGame = _ => {
      const url = `${this.state.host}/games/add?id=${this.state.email}&score=${this.state.gameScore}&date=${this.state.date}`;
        fetch(url)
        .then(response => response.json())
        this.pullGames();
    }

  render() {
    const { games } = this.state;
    return (
      <div className="app-container">
        <div className="app-sidepanel">
          <div>
            <input type="text" placeholder="Score" onChange={ (e) => this.setState({gameScore : e.target.value})} />
            <input type="text" placeholder="Date" onChange={ (e) => this.setState({date : e.target.value})} />
            <button onClick={() => {
              this.addGame()
              }}>Add Game</button>
          </div>
        </div>
        <div className="app-content">
        <table>
          <thead>
            <tr>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {games.map(this.renderGames)}
          </tbody>
        </table>
        </div>
      </div>
      );
    }
  }

  export default App;
