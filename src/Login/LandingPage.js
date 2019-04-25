import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Button, SvgIcon, Hidden, Grid, Table, TableBody, TableRow, TableHead, TableCell, Divider} from '@material-ui/core'
import Mail from '@material-ui/icons/Mail'
import {Chart} from 'primereact/chart'
import Figure from '../assets/figure-1.jpg'
import Logo from '../assets/logo.png'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container:{
      paddingTop:0,
      paddingLeft:50,
      paddingRight:50,
      margin:0,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding:0
      },
  },
  figure: {
      width:'40vW'
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
        width:50,
        margin:10,
    },
    [theme.breakpoints.up('md')]: {
        width:100,
        margin:20,
    },
      float:'left'
  },
  footerLogo: {
    [theme.breakpoints.down('sm')]: {
        width:50,
        margin:10,
    },
    [theme.breakpoints.up('md')]: {
        width:100,
        margin:20,
    },
      float:'left',
    //   margin:50
  },
  figureOneDesc: {
      marginTop:'auto'
  },
  figureOneTitle: {
      paddingBottom: 20,
      [theme.breakpoints.down('sm')]: {
        fontSize:30,
      },
  },
  header: {
      padding:20,
      margin: 20
  },
  grow: {
    flexGrow: 1,
  },
  chart: {
      padding:0,
      marginBottom: 30,
      [theme.breakpoints.down('sm')]: {
        width:'100vw'
      },
  },
  table:{
    [theme.breakpoints.down('sm')]: {
        width:'100vw'
    },
    [theme.breakpoints.up('md')]: {
        width:'50vw'
    },
  },
  login: {
      marginRight:10,
      marginLeft:10,
      float:'right',
      textTransform: 'none',
      [theme.breakpoints.down('sm')]: {
        fontSize:15,
      },
      [theme.breakpoints.up('md')]: {
        fontSize:20,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize:20,
      },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  footer: {
      height:200
  },
  divider: {
      paddingTop:40,
      paddingBottom: 40
  },
  icon: {
      padding:10
  },
  link: {
      backgroundColor: 'transparent',
      [theme.breakpoints.down('sm')]: {
        fontSize:15,
      },
      [theme.breakpoints.up('md')]: {
        fontSize:20,
      },
  },
  logoText: {
      paddingTop:25,
      [theme.breakpoints.down('sm')]: {
          fontSize:20,
        }
    }
});

class LandingPage extends Component {

  state = {
    email: localStorage.getItem('email') !== null ? localStorage.getItem('email').slice(1,localStorage.getItem('email').length-1) : null,
    profile: false,
    width:window.innerWidth
  }
  
  render() {
    const {classes} = this.props
    const data = {
        labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 6'],
        datasets: [
            {
                label: 'Scores',
                data: [250, 225, 270, 240, 275, 280],
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            },
            {
                label: 'Average',
                data: [250, 238, 248, 246,  252, 256],
                fill: false,
                backgroundColor: '#66BB6A',
                borderColor: '#66BB6A'
            }
        ]   
    };
    
    return (
      <div>
          
        <Grid container spacing={24} className={classes.container}>

            <Grid className={classes.header} direction='row' item xs={12}>
                <img className={classes.logo} src={Logo} alt='logo' />
                <Typography className={classes.logoText} variant='h5'>Bowling Stats</Typography>
                <Button
                    className={classes.login}
                    variant='contained'
                    color='secondary'
                    onClick={this.props.callback} >
                    Sign up
                </Button>
                <Button
                    className={classes.login}
                    onClick={this.props.callback} >
                    Log in
                </Button>
            </Grid>

            <Grid item xs={12} sm={6}
                alignItems="center"
                justify="center"
                direction="row"
                container>
                <div>
                    <Typography className={classes.figureOneTitle} variant='h3'>Track and Save Bowling Games</Typography>
                    <Typography variant='p'>
                        See real-time updates and tracking analytics for all of your recent and past games.
                        Table view and Graph view provided below.
                        <Hidden only={["sm","xs"]}>
                        View every game you have played and how you have improved.
                        Also can provide progression and deliver insight on how to improve your 10 frames.</Hidden>
                    </Typography>
                </div>
            </Grid>
            <Hidden only={["xs"]}>
                <Grid item xs={6}>
                    <img className={classes.figure} src={Figure} alt='clipart-stats' />
                </Grid>
            </Hidden>

            <Grid container direction='row' justify="center" xs={24}>
                <Chart className={classes.chart} type="line" data={data} />
            </Grid>

            <Grid container direction='row' justify='center' xs={24}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">250</TableCell>
                        <TableCell align="center">March 6, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">225</TableCell>
                        <TableCell align="center">March 13, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">270</TableCell>
                        <TableCell align="center">March 20, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">240</TableCell>
                        <TableCell align="center">March 27, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">275</TableCell>
                        <TableCell align="center">April 3, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">280</TableCell>
                        <TableCell align="center">April 10, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <DeleteIcon color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Grid>
            

        </Grid>
        
        <Grid className={classes.divider} xs={24}>
            <Divider />
        </Grid> 
        <Grid container alignContent='baseline' className={classes.footer}sm={24} xs={12}>
                <Grid container item xs={3} direction='column' alignItems='center'>
                    <img className={classes.footerLogo} src={Logo} alt='logo' />
                </Grid>
                <Grid container direction='column' alignItems='center' sm={6} xs={4}>
                    <IconButton href="mailto:tuckerdanielmiller@gmail.com" style={{backgroundColor:'transparent'}} className={classes.link}>
                        <Mail className={classes.icon} />
                        <Hidden only={["xs"]}>contactUs@gmail.com</Hidden>
                    </IconButton>
                </Grid>
                
                <Grid container direction='column' justify='space-evenly' xs={4} sm={3}>
                    <Typography variant='p'></Typography>
                    <Grid alignItems='center' container direction='column'>
                        <IconButton href="https://www.linkedin.com/in/tuckermiller7/" target="#" style={{backgroundColor:'transparent'}} className={classes.link}>
                            <SvgIcon className={classes.icon}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></SvgIcon>
                            <Hidden only={["xs"]}>LinkedIn</Hidden>
                        </IconButton>
                    </Grid>
                    <Grid alignItems='center' container direction='column'>
                        <IconButton href="https://github.com/tdmiller1" target="#" style={{backgroundColor:'transparent'}} className={classes.link}>
                            <SvgIcon className={classes.icon}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></SvgIcon>
                            <Hidden only={["xs"]}>GitHub</Hidden>
                        </IconButton>
                    </Grid>
                    <Grid alignItems='center' container direction='column'>
                        <IconButton  href="https://tuckermillerdev.com" target="#" style={{backgroundColor:'transparent'}} className={classes.link}>
                        &copy;TuckerMillerDev
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
      </div>
      );
    }
  }

  export default withStyles(styles)(LandingPage);
