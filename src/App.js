import React, { Component } from 'react';
import Game from './Dashboard/Game';
import Sidenav from './Dashboard/Sidenav';

class App extends Component {

  constructor(props){
    super(props)
        this.state = {
          games:[],
          email:"",
          gameScore:0,
          date:""
        }
  }

  componentDidMount(){
    this.pullGames();
  }

  pullGames = _ => {
    if(localStorage.getItem("email")){
      const email = JSON.parse(localStorage.getItem("email"));
      this.setState({email: email})
      const url = `http://localhost:3001/games/find?id=${email}`;
      fetch(url)
      .then(response => response.json() )
      .then((data) => {
        if(data.games.length > 0){
          this.setState({games : data.games})
        }
      })
    }
  }

  renderGames = ({_id, score, date}) => 
    <Game key={_id}
      _id={_id}
      score={score}
      date={date} />

    addGame = _ => {
      const url = `http://localhost:3001/games/add?id=${this.state.email}&score=${this.state.gameScore}&date=${this.state.date}`;
        fetch(url)
        .then(response => response.json() )
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
              <th>ID</th>
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
