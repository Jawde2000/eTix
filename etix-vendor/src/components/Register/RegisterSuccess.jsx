import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import etixLogo from '../globalAssets/eTixLogo.png'
import Clock from 'react-live-clock'
import Moment from 'react-moment';
import moment from 'moment';
import { useLocation } from 'react-router-dom'
import { fontSize } from '@mui/system';
import moscow from '../globalAssets/moscow.jpg'

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "lighten",
        minHeight: 700
    },
    button: {
        borderRadius: "50%",
        backgroundColor: '#F5CB5C'
    }
}));



function Register() {
  const defaultStyle = useStyles();

  return (
      <Box className={defaultStyle.whole}>
          <Grid xs={12} container>
              <Grid xs={12} container>
                  <Grid xs={12} direction="column">    
                      <Grid xs={12} container direction="column" style={{ minHeight: "100vh" }} justifyContent="center" alignItems="center" justify="center">
                          <Grid xs={12} justifyContent="center" alignItems="center" justify="center" container >
                              <Typography style={{fontSize: 30, fontWeight: "bold",fontFamily: ['rubik', 'sans-serif'].join(','), color: 'black'}}>
                                  Your registration is success! We will send an email to you when your status is being verified
                              </Typography>
                          </Grid>
                          <Grid xs={12}>
                              <Button 
                              sx={{ m: 1 }}
                              id="new-sumbit"
                              type="submit"
                              href="/"
                              variant="contained"
                              style={{fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: '#F5CB5C', borderRadius: 50}}
                              >
                              <Typography style={{fontSize: 30, fontWeight: "bold",fontFamily: ['rubik', 'sans-serif'].join(','), color: "black"}}>
                                  Return to Login page
                              </Typography>
                              </Button>
                          </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
          </Grid>
      </Box>
  );

}

export default Register;