import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import etixLogo from '../globalAssets/eTixLogo.png'
import Clock from 'react-live-clock'
import Moment from 'react-moment';
import moment from 'moment';
import { useLocation } from 'react-router-dom'
import { fontSize } from '@mui/system';
import LoginForm from './LoginForm';
import moscow from '../globalAssets/moscow.jpg'

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "lighten",
        minHeight: 700
      },
}));



function Login() {
  const defaultStyle = useStyles();

  return (
      <Box className={defaultStyle.whole}>
          <Grid xs={12} container>
              <Grid xs={6} item>
                  <Grid xs={12} direction="column" >    
                      <Grid xs={12} container direction="column" style={{ minHeight: "100vh" }} justifyContent="center" alignItems="center" justify="center">
                          <Grid xs={6}>
                          </Grid>
                          <Grid xs={6}>
                          
                          <Typography style={{fontSize: 45, fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold",color: 'white', textShadow: '1px 1px 2px black'}}>
                              Once you have eTix, an ultimate journey is ready 
                          </Typography>
                          
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid xs={6} item>
                  <Grid xs={12} direction="column" >    
                      <Grid xs={12} container direction="column" style={{ minHeight: "100vh" }} justifyContent="center" alignItems="center" justify="center">
                          <Grid xs={12}>
                              <LoginForm />
                          </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
          </Grid>
      </Box>
  );

}

export default Login;