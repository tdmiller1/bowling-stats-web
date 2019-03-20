import React, { Component } from 'react';
import Game from './Dashboard/Game';
import axios from 'axios';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


class App extends Component {

  constructor(props){
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      games:[],
      email:"",
      gameScore:'',
      date:"",
      host:"",
      selectedDay:""
    };
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }

  componentWillMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"})
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"})
    }
    this.setEmail();
  }

  componentDidMount(){
    this.pullGames();
  }

  setEmail(){
    const storageEmail = JSON.parse(localStorage.getItem("email"));
    this.setState({email : storageEmail})
    this.pullGames();
  }

  async pullGames(){
    const allGamesUrl = `${this.state.host}/games/find?id=${this.state.email}`;
    const response = await axios.get(allGamesUrl)
    if(response){
      this.setState({games: response.data.games})
      console.log(response.data.games)
    }
  }

<<<<<<< HEAD
  callback(){
    this.pullGames();
=======
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
<<<<<<< Updated upstream
=======
>>>>>>> 5c2a9f6b072f9dca09d6d70b7185ead6aa3d467a
>>>>>>> Stashed changes
  }

  renderGames = ({_id, score, date}) => 
    <Game key={_id}
      id={_id}
      score={score}
      date={date}
      callback={this.callback.bind(this)} />

    async addGame(){
      const addGameUrl = `${this.state.host}/games/add`;
      const response = await axios.post(addGameUrl,{
        id:this.state.email,
        score:this.state.gameScore,
        date:this.state.selectedDay
      })
      if(response){this.pullGames();}
      
    }

    handleChange(date) {
      console.log(date)
    }

  render() {
    const { games } = this.state;
    const STYLE = {backgroundColor:'white'}
    const inputStyle = {height:'25px'}
    return (
      <div className="app-container">
        <div className="app-sidepanel">
          <div>
            <input style={inputStyle} maxLength="3" min="0" max="300" value={this.state.gameScore} placeholder="Score" onChange={ (e) => {this.setState({gameScore : e.target.value}); }} />
            <div style={STYLE}>
              <DayPicker
                  required
                  selectedDays={this.state.selectedDay}
                  onDayClick={this.handleDayClick}
                />
              </div>

            <button type="submit" onClick={() => {
                if(this.state.selectedDay == ""){

                }else{
                  this.addGame();
                  this.setState({gameScore: ""})
                }
              }}>Add Game</button>
          </div>
        </div>
        <div>
        </div>
        <div className="app-content">
        <table>
          <thead>
            <tr>
              <th></th>
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
