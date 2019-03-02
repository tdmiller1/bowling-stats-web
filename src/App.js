import React, { Component } from 'react';
import Game from './Dashboard/Game';
import Sidenav from './Dashboard/Sidenav';

class App extends Component {
  
  render() {
    return (
      <div>
        <Sidenav />
        <Game />
      </div>
      );
    }
  }

  export default App;
