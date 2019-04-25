import React, { Component } from 'react';

import arrow from '../assets/arrow.png'
import ArrowBack from "@material-ui/icons/ArrowBack";
import { withStyles } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';

  const styles = theme => ({
    arrow:{
        width:'40vw'
    },
    icon:{
        margin:'0px',
        padding:'0px',
        cursor:'pointer'
    },
  });

class AddGame extends Component {

  render() {
    const {classes} = this.props
    return (
        <div>
            <Hidden only={['xs','sm']}>
                <Typography variant='h4'>
                    Add Score and Date to submit game
                </Typography>
            </Hidden>
            <Hidden only={['md','lg','xl']}>
                <img src={arrow} className={classes.arrow}/>
                <Typography variant='h4'>
                    Press the '+' to add a game
                </Typography>
            </Hidden>
            
            
        </div>
      )
    }
  }

  export default withStyles(styles)(AddGame);
