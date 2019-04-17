import React, { Component } from 'react';
import Game from './Dashboard/Game';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {Chart} from 'primereact/chart'
import moment from 'moment';
import Table from '@material-ui/core/Table';
import {Drawer, Hidden} from '@material-ui/core'
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
  chart: {
    width:'45wv',
    padding:'10px calc(25% - 70px)',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      padding:0,
    },
  },
  sidepanel: {

  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  headerText:{
    fontSize:15,
    [theme.breakpoints.up('md')]: {
      fontSize:20
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  content:{
    padding:'0px',
    width:'100%',
    [theme.breakpoints.down('md')]: {
      margin:0,
      width:'calc(100%-10px)'
    },
  },
  dense: {
    marginTop: 16,
  },
  addGame: {
    margin:10
  },
  menu: {
    width: 200,
  },
  table: {
    overflowY:'auto',
    [theme.breakpoints.up('xs')]: {
      overflowY:'auto',
      height: 'calc(100% - 575px)',
    },
    [theme.breakpoints.down('md')]: {
      overflowY:'auto',
      height: 'calc(100% - 475px)',
    },
    [theme.breakpoints.down('xl')]: {
      overflowY:'auto',
      height: 'calc(100% - 460px)',
    },
    [theme.breakpoints.down('sm')]: {
      overflowY:'auto',
      height: 'calc(100% - 275px)',
    }
  }
});

class App extends Component {

  constructor(props){
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      games:null,
      sortedGames:null,
      email:this.props.email,
      gameScore:"",
      date:"",
      host:"",
      selectedDay:moment().toDate(),
      error:false,
      width:window.innerWidth,
      left:this.props.openDrawer
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

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
  }


  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({left:nextProps.openDrawer})
    console.log(nextProps)
  }

  componentDidMount(){
    this.pullGames();
}

  compare(a,b){
    return moment.utc(a.date).diff(moment.utc(b.date))
  }

  average(list){
    var sum = 0
    for(var i = 0; i < list.length; i++){
      sum = sum + list[i].score
    }

    return(sum / list.length || 0)
  }

  movingAverage(list){

    var averageList = []
    for(var i = 1; i < list.length+1; i++){
      averageList.push(this.average(list.slice(0,i)))

    }
    
    return averageList;

  }

  prepareData(){
    var alabels = []
    var adata = []
    var blabels = []
    var bdata = []

    if(this.state.games === null){
      return
    }
    else{
      this.state.games.sort(this.compare)

      var averageList = this.movingAverage(this.state.games);
      averageList[0] = this.state.games[0].score

      for(var i = 0; i < this.state.games.length; i++){
        alabels.push(i)
        adata.push(this.state.games[i].score)
      }

      for(var j = 0; j < averageList.length; j++){
        blabels.push(j)
        bdata.push(averageList[j])
      }

      this.setState({averages: averageList, data: {labels: alabels, datasets: [ 
        {label: "Games", data: adata, fill: false, backgroundColor: "#42A5F5", borderColor: '#42A5F5'},
        {label: "Average", data: bdata, fill: false, backgroundColor: "#66BB6A", borderColor: '#66BB6A'}
      ]}})
    }
  }

  async pullGames(){
    const allGamesUrl = `${this.state.host}/games/find?id=${this.props.email}`;
    await axios.get(allGamesUrl).then(response => {
      this.setState({games: response.data.games})
      this.prepareData();
    })
  }

  callback(){
    this.pullGames();
  }

  renderGames = ({_id, score, date, playerId}) => 
    <Game key={_id}
      id={_id}
      score={score}
      playerId={playerId}
      date={date}
      callback={this.callback.bind(this)} />
    
    async addGame(){
      const addGameUrl = `${this.state.host}/games/add`;
      const response = await axios.post(addGameUrl,{
        id:this.props.email,
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
      
      <Hidden only={["md","lg","xl"]}>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div className={classes.sidepanel}>
            <form  onSubmit={(e) => {
              e.preventDefault();
              if(this.state.selectedDay === "" || this.state.gameScore === ""){
                this.setState({error: "Enter Info Please"})
              }else{
                this.addGame();
                this.setState({gameScore: ""})
                this.setState({error: false, left:false})
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

                <Button className={classes.addGame} variant="contained" color="primary" type="submit">Add Game</Button>
                {
                this.state.error && (
                  <h1>{this.state.error}</h1>
                )
              }
            </form>
          </div>
        </Drawer>
        </Hidden>
        <Hidden only={["xs","sm"]} >
        <div className="app-sidepanel">
            <form  onSubmit={(e) => {
              e.preventDefault();
              if(this.state.selectedDay === "" || this.state.gameScore === ""){
                this.setState({error: "Enter Info Please"})
              }else{
                this.addGame();
                this.setState({gameScore: ""})
                this.setState({error: false, left:false})
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
          </Hidden>
        
        <div className={classes.content}>
        { games != null ?
          <div className="app-chart"> 
            <Chart className={classes.chart} type="line" data={this.state.data} />
          </div>
           : <div></div>}
          { games != null ? 
          <div className={classes.table}>
          <Table>
              <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerText} align="center">Score</TableCell>
                    <TableCell className={classes.headerText} align="center">Date</TableCell>
                    <TableCell align="center"></TableCell>
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
