import {  Grid, Box,  Link, Typography, Container} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState} from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import images from '../globalAssets/scripts/bgchange';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundBlendMode: "lighten",
      minHeight: 800
    },
    welcome: {
      padding: 60,
      color: 'white',
      fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    urlVerification: {
      borderRadius: 20,
      backgroundColor: '#F5CB5C',
      padding: 20,
      opacity: 0.7,
      paddingLeft: 150,
      paddingRight: 150,
    }, 
    lockcustom: {
      alignItems:"center",
      justifyContent:"center",
      display:"flex",
      paddingBottom: 5,
      color: "#32CD32",
    },
    urlText: {
      fontSize: 17,
      opacity: 1,
      textDecorationLine: "none",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
        color: "#32CD32",
      }
    },
    lime: {
      color: "#32CD32"
    },
    vl: {
        border: '6px solid green',
        height: '500px'
    }
}));

function PassportRegister() {
  const defaultStyle = useStyles();
  const [transition, setTransition] = useState(true);

  return (
      <div>
        <Grid container className={defaultStyle.whole}>
          <Grid xs={12} direction="column" container justify="center" alignItems="center" alignContent="center">
            <Grid xs={12} sm={2} item>
              <Typography variant="h2" className={defaultStyle.welcome} style={{fontFamily: ['rubik', 'sans-serif'].join(','), }}>
                {transition?<div style={{textShadow: '1px 1px 2px black'}}>Welcome to eTix</div>:<div style={{textShadow: '1px 1px 2px black'}}>Welcome Back</div>}
              </Typography>
            </Grid>
            <Grid xs={12} sm={2} item>
              <Box className={defaultStyle.urlVerification}>
                <Grid item className={defaultStyle.lockcustom}>      
                  <LockIcon />
                </Grid>
                <Grid xs={12} item>
                  <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 18, display: "flex", opacity: 1,}}>
                    url verification: <Link style={{textDecoration: "none"}}><span className={defaultStyle.urlText}><span className={defaultStyle.lime}>https://</span>etix.io</span></Link>
                  </Typography>
                </Grid>
              </Box>
            </Grid>     
            <Grid xs={12} sm={3} item>
              {transition?<RegisterForm />:<LoginForm />}
            </Grid>    
          </Grid>
        </Grid>
      </div>
  );

}

export default PassportRegister;