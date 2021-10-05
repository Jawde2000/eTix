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
import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "lighten",
        minHeight: 700
      },
}));



function Register() {
  const defaultStyle = useStyles();

  return (
      <Box className={defaultStyle.whole}>
          <Grid xs={12} container>
              <Grid xs={12} container>
                  <Grid xs={12} direction="column" >    
                      <Grid xs={12} container direction="column" style={{ minHeight: "100vh" }} justifyContent="center" alignItems="center" justify="center">
                          <Grid xs={12}>
                              <RegisterForm />
                          </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
          </Grid>
      </Box>
  );

}

export default Register;