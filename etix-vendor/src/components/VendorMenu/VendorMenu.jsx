import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect} from 'react';
import bangkok from '../globalAssets/bangkok.jpg';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import GroupIcon from '@mui/icons-material/Group';
import TelegramIcon from '@mui/icons-material/Telegram';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import '../Header/header.css';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${bangkok})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      minHeight: 700
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
    }
}));

function VendorMenu() {
  const defaultStyle = useStyles();
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  let history = useHistory()

  useEffect(() => {
    if(!userInfo) {
        history.push('/')
    }
  },[userInfo])

  return (
      <div>
        <Grid container className={defaultStyle.whole}>
          <Grid xs={12} direction="column" container justify="center" alignItems="center" alignContent="center">
            <Grid xs={12} sm={2} item>
              <Typography variant="h2" className={defaultStyle.welcome} style={{fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                Welcome Back, {userInfo? userInfo.username : null}  
              </Typography>
            </Grid>
            <Grid xs={1} item direction="row" display="flex" spacing={20}>
              <Grid item xs={4} sm={4} md={4} >
              <Link href="/menu/servicemanagement" style={{textDecoration: "none"}}>
                <Button style={{maxWidth: '350px', maxHeight: '350px', minWidth: '350px', minHeight: '350px',}}>
                  <Grid xs={12}>
                  <Grid xs={12}>
                  <DirectionsBusIcon style={{fontSize: 150, color: "black"}}/>
                  </Grid>
                  <Grid xs={12}>
                  <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 35, color: "black"}}>
                  Service Management
                  </Typography>
                  </Grid>
                  </Grid>
                </Button>
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} md={4} >
                <Link href="/menu/helpmanage" style={{textDecoration: "none"}}>
                <Button style={{maxWidth: '350px', maxHeight: '350px', minWidth: '350px', minHeight: '350px'}}>
                  <Grid xs={12}>
                  <Grid xs={12}>
                  <TelegramIcon style={{fontSize: 150, color: "black"}}/>
                  </Grid>
                  <Grid xs={12}>
                  <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 35, color: "black"}}>
                  Helpdesk Management
                  </Typography>
                  </Grid>
                  </Grid>
                </Button>
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} md={4} >
                <Link href="/menu/sales" style={{textDecoration: "none"}}>
                <Button 
                style={{maxWidth: '350px', maxHeight: '350px', minWidth: '350px', minHeight: '350px'}}>
                  <Grid xs={12}>
                  <Grid xs={12}>
                  <AccountBalanceIcon style={{fontSize: 150, color: "black"}}/>
                  </Grid>
                  <Grid xs={12}>
                  <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 35, color: "black"}}>
                  Sales 
                  </Typography>
                  <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 35, color: "black"}}>
                  Report
                  </Typography>
                  </Grid>
                  </Grid>
                </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );

}

export default VendorMenu;