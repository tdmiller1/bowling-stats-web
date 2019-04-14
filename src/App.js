import React, { Component } from 'react';
import Game from './Dashboard/Game';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

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
      selectedDay:moment().toDate(),
      error:false
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

  callback(){
    this.pullGames();
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
    const { classes } = this.props;
    const STYLE = {backgroundColor:'white'}
    const inputStyle = {backgroundColor: 'white',margin: '20px', minWidth:"250px"}
    return (
      <div className="app-container">
        <div className="app-sidepanel">
          <form  onSubmit={(e) => {
            e.preventDefault();
            if(this.state.selectedDay === "" || this.state.gameScore === 0){
              this.setState({error: "Enter Info Please"})
            }else{
              this.addGame();
              this.setState({gameScore: ""})
              this.setState({error: false})
            }
          }}>
          <TextField style={inputStyle} 
            InputProps={{ inputProps: { min: 1, max: 300 } }}
            type="number"
            variant="outlined"
            value={this.state.gameScore}
            placeholder="Score"
            onChange={ (e) => {this.setState({gameScore : parseInt(e.target.value,10) || 0}); }} />
            <div style={STYLE}>
              <DayPicker
                  required
                  selectedDays={this.state.selectedDay}
                  onDayClick={this.handleDayClick}
                />
              </div>

              <Button variant="contained" color="primary" type="submit">Add Game</Button>
              {
              this.state.error && (
                <h1>{this.state.error}</h1>
              )
            }
          </form>
        </div>
        
        <div className="app-content">
        { games.length > 0 ?
          <div className="app-chart"> 
            {/* <Chart className="chart" type="line" data={this.state.data} /> */}
          </div>
           : <div></div>}
          { games != null ? 
          <div className="app-table">
          <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                    <TableCell>Delete</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">Date</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {games.map(this.renderGames)}
            </TableBody>
          </Table>
          </div>
          : <div>To see stats add bowling scores</div> }
        </div>
      </div>
      );
    }
  }

  export default withStyles(styles)(App);
