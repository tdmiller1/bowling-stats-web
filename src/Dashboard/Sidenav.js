import React, { Component } from 'react';

class Game extends Component {
  
  constructor(props){
    super(props)
        this.state = {
          gameScore:0,
          date:""
        }
  }

  addGame = _ => {
    const url = `http://localhost:3001/games/add?id=${this.props.email}&score=${this.state.gameScore}&date=${this.state.date}`;
      fetch(url)
      .then(response => response.json() )
  }

  render() {
    
    return (
      <div>
        <input type="text" placeholder="Score" onChange={ (e) => this.setState({score : e.target.value})} />
        <input type="text" placeholder="Date" onChange={ (e) => this.setState({date : e.target.value})} />
        <button onClick={() => this.addGame()}>Add Game</button>
      </div>
      );
    }
  }

  export default Game;
