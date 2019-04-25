import React, { Component } from 'react';
import Friend from '../friends/Friend'

import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Typography,
  Grid,
  Table} from '@material-ui/core'

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
    profileCard: {
      textAlign:"center", 
      width:'50%',
      marginLeft:'25%',
      [theme.breakpoints.down('sm')]: {
        width:'80%',
        marginLeft:'10%',
      },
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    text: {
      [theme.breakpoints.down('sm')]: {
        fontSize:25
      },
      [theme.breakpoints.up('sm')]: {
        fontSize:45
      },
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });

  

class Leaderboard extends Component {

  state = {
    friends:[],
    email:localStorage.getItem('email').slice(1,localStorage.getItem('email').length-1)
  }

  async pullFriends(){
    //   let friendsList = ['tuckerdanielmiller@gmail.com','brett@mlswebsite.us','kmiller@rentbiggs.com']
    let friendsList = []
    const friendsUrl = `http://localhost:3001/users/find/friends?id=${this.state.email}`;

    axios.get(friendsUrl).then(response => {
        let friends = response.data.friends
        for(var i =0; i < friends.length; i++){
            friendsList.push(friends[i])
        }
    }).then(() => {
        let friendsObjects = []
        for(var i = 0; i < friendsList.length; i++){
            const friendStatUrl = `http://localhost:3001/users/find?id=${friendsList[i]["_id"]}`;
            axios.get(friendStatUrl).then(response => {
                friendsObjects.push(response.data.user[0])
                friendsObjects.sort((a, b) => (a.max < b.max) ? 1 : -1)
                this.setState({friends:friendsObjects})
            })
        }
    })

  }

  
  componentWillMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        this.setState({host: "http://localhost:3001"}, ()=> {
            this.pullFriends()
        })
    } else {
        this.setState({host: "https://bowling-stats-server.herokuapp.com"}, () => {
            this.pullFriends()
        })
    }
  }
  

  renderFriends = ({_id, average, max, verified}) => 
    <Friend key={_id}
        playerId={_id}
        average={average}
        highscore={max}
        verified={verified} />

  
  render() {
      const {classes} = this.props
      const {friends} = this.state
    return (
        <Grid alignItems="stretch" justify="center" className={classes.table2} direction='row' container >
        <Typography className={classes.cellText} variant="h2" gutterBottom>Leaderboards</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.headerText} align="center">PlayerId</TableCell>
                        <TableCell className={classes.headerText} align="center">Average</TableCell>
                        <TableCell className={classes.headerText} align="center">HighScore</TableCell>
                        <TableCell className={classes.headerText} align="center">Verified</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {friends.map(this.renderFriends)}
                </TableBody>
            </Table>
        </Grid>
      );
    }
  }

  export default withStyles(styles)(Leaderboard);
