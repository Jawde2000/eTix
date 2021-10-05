import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import etixLogo from '../globalAssets/eTixLogo.png'
import Clock from 'react-live-clock'
import Moment from 'react-moment';
import moment from 'moment';
import { useLocation } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  customizeAppbar: {
    minHeight: 130,
    background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
    position: 'relative',
    paddingRight: 150,
    fontFamily: ['rubik', 'sans-serif'].join(','),
    boxShadow: 'none'
  },
  resizePic: {
    width: 118.5,
    height: 57.375,
    paddingLeft: 40,
    paddingTop: 30,
  },
  resizeLogo: {
    color: '#CFDBD5',
    fontFamily: ['rubik', 'sans-serif'].join(','),
    fontWeight: "bold",
    paddingTop: 30,
  },
  display: {
    display: "flex",
    align: "center"
  },
  rightClock: {
    float: "right"
  }
}));



function NavBar() {
  const defaultStyle = useStyles();
  const [value, setValue] = useState("/");
  var dateAndTime= moment().format("DD/MM/YYYY");

  return (
          <AppBar className={defaultStyle.customizeAppbar} position="relative">
            <Grid xs={12} container >
              <Grid xs={12} direction="column">
           
              <Grid xs={12} container justify="center" direction="row" alignItems="center">
              <Grid item>
              <Link href='http://localhost:3000/'         
                style={{ textDecorationLine: 'none', display: "flex",}}>        
                  <img src={etixLogo} className={defaultStyle.resizePic}/>
                  <Typography className={defaultStyle.resizeLogo} variant="h2" sx={{ flexGrow: 1 }} style={{fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                    eTix 
                  </Typography>
              </Link>
              </Grid>
              </Grid>
              <Grid xs={12}>
                <Grid item className={defaultStyle.rightClock}>
                  <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 16}}>
                  <Clock format={'HH:mm:ss a |  ' + dateAndTime} ticking={true} timezone={'Asia/Kuala_Lumpur'}/>
                  </Typography>
                </Grid>
              </Grid>
              </Grid>
            </Grid>
          </AppBar>
  );

}

export default NavBar;