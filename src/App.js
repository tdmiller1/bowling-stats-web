import React, { Component } from 'react';
import Game from './Dashboard/Game';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import AddGame from './Dashboard/AddGame'
import {Chart} from 'primereact/chart'
import moment from 'moment';
import {Drawer, 
  Hidden, 
  Grid, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Button, 
  TextField, 
  Table} from '@material-ui/core'

const styles = theme => ({
  chart: {
    width:'45wv',
    padding:'10px calc(25% - 70px)',
    [theme.breakpoints.down('sm')]: {
      width:'85vw',
      padding:'10px 5%',
    },
    [theme.breakpoints.up('md')]: {
      width:'45vw',
      padding:'10px calc(25% - 70px)',
    },
    [theme.breakpoints.up('lg')]: {
      width:'45vw',
      maxWidth:'850px',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth:'850px',
    },
  },
  sidepanel: {
    borderRight:0
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  headerText:{
    fontSize:14,
    [theme.breakpoints.up('md')]: {
      fontSize:15
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chart2: {
    minHeight:'calc(50vh - 68px)',
    [theme.breakpoints.up('xs')]: {
      minHeight:'calc(40vh - 68px)',
      maxHeight:'calc(40vh - 68px)'
    },
    [theme.breakpoints.up('sm')]: {
      minHeight:'calc(50vh - 68px)',
      maxHeight:'calc(50vh - 68px)'
    },
    [theme.breakpoints.up('md')]: {
      minHeight:'calc(37vh - 68px)',
      maxHeight:'calc(37vh - 68px)'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight:'calc(52vh - 68px)',
      maxHeight:'calc(52vh - 68px)'
    },
    
  },
  table2: {
    minHeight:'50vh',
    overflowY:'auto',
    [theme.breakpoints.up('xs')]: {
      minHeight:'60vh',
      maxHeight:'60vh'
    },
    [theme.breakpoints.up('sm')]: {
      minHeight:'50vh',
      maxHeight:'50vh'
    },
    [theme.breakpoints.up('md')]: {
      minHeight:'63vh',
      maxHeight:'63vh'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight:'48vh',
      maxHeight:'48vh'
    },
  },
  container: {
    margin:0,
    padding:0,
    width:'100%'
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

    if(this.state.games === null || this.state.games.length === 0){
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

      var mostRecentGameSorted = this.state.games.reverse();

      this.setState({
        games: mostRecentGameSorted,
        averages: averageList,
        data: {
          labels: alabels,
          datasets: [
            {
              label: "Games",
              data: adata,
              fill: false,
              backgroundColor: "#42A5F5",
              borderColor: '#42A5F5'
            },{
              label: "Average",
              data: bdata,
              fill: false,
              backgroundColor: "#66BB6A",
              borderColor: '#66BB6A'
            }
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
                    disabledDays={[
                      {
                        after: new Date(),
                        before: new Date(2100, 3, 25),
                      },
                    ]}
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
                    disabledDays={[
                      {
                        after: new Date(),
                        before: new Date(2100, 3, 25),
                      },
                    ]}
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
        {
          (()=> {
            if(games != null){
              if(games.length === 0){
                return <AddGame />
              }else{
                return (
                  <Grid container spacing={24} className={classes.container}>
                    <Grid container className={classes.chart2} direction='row' >
                      <Chart className={classes.chart} type="line" data={this.state.data} />
                    </Grid>
                    <Grid alignItems="stretch" justify="center" className={classes.table2} direction='row' container >
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
                    </Grid>
                </Grid>)
              }
            }
          })()
        }
        </div>
      </div>
      );
    }
  }

  export default withStyles(styles)(App);
