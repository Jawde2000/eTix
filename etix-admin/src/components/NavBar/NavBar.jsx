import { AppBar, Grid,   Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import etixLogo from '../globalAssets/eTixLogo.png'
import Clock from 'react-live-clock'
import moment from 'moment';
import { HELP_LIST_RESET, HELP_DELETE_RESET, HELP_DETAIL_RESET, HELP_SAVE_RESET, HELP_SEND_RESPONSE_RESET  } from '../../constants/helpConstants';
import { USER_UPDATE_RESET, USER_LIST_RESET, USER_DETAIL_RESET, USER_DELETE_RESET, USER_CUSTOMER_REGISTER_RESET, USER_REGISTER_RESET, USER_VENDOR_REGISTER_RESET, USER_VENDOR_UPDATE_RESET, USER_CUSTOMER_UPDATE_RESET } from '../../constants/userConstants';
import {SERVICE_LIST_RESET, SERVICE_DETAIL_RESET, SERVICE_ADD_RESET, SERVICE_DELETE_RESET, SERVICE_SAVE_RESET, VENDOR_DETAIL_RESET, LOCATION_DETAIL_RESET} from '../../constants/serviceConstants'
import {SERVICE_LIST_DATAGENERATION_RESET, PAYMENT_LIST_RESET} from '../../constants/salesConstants';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  customizeAppbar: {
    minHeight: 130,
    background: 'linear-gradient(to right, rgb(65, 41, 90), rgb(47, 7, 67))',
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
  const [value] = useState("/");
  var dateAndTime= moment().format("DD/MM/YYYY");

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch({type: HELP_LIST_RESET});
    dispatch({type: HELP_DELETE_RESET});
    dispatch({type: HELP_DETAIL_RESET});
    dispatch({type: HELP_SAVE_RESET});
    dispatch({type: HELP_SEND_RESPONSE_RESET});
    
    dispatch({type: USER_UPDATE_RESET});
    dispatch({type: USER_LIST_RESET});
    dispatch({type: USER_DETAIL_RESET});
    dispatch({type: USER_DELETE_RESET});
    dispatch({type: USER_CUSTOMER_REGISTER_RESET});
    dispatch({type: USER_REGISTER_RESET});
    dispatch({type: USER_VENDOR_REGISTER_RESET});
    dispatch({type: USER_VENDOR_UPDATE_RESET});
    dispatch({type: USER_CUSTOMER_UPDATE_RESET});

    dispatch({type: SERVICE_LIST_RESET})
    dispatch({type: SERVICE_DETAIL_RESET})
    dispatch({type: SERVICE_ADD_RESET})
    dispatch({type: SERVICE_DELETE_RESET})
    dispatch({type: SERVICE_SAVE_RESET})
    dispatch({type: VENDOR_DETAIL_RESET})
    dispatch({type: LOCATION_DETAIL_RESET})

    dispatch({type: SERVICE_LIST_DATAGENERATION_RESET})
    dispatch({type: PAYMENT_LIST_RESET})
  }

  return (
          <AppBar className={defaultStyle.customizeAppbar} position="relative">
            <Grid xs={12} container >
              <Grid xs={12} direction="column">
           
              <Grid xs={12} container justify="center" direction="row" alignItems="center">
              <Grid item>
              <Link to={value} onClick={handleReset}          
                style={{ textDecorationLine: 'none', display: "flex",}}>        
                  <img src={etixLogo} alt="etixLogo" className={defaultStyle.resizePic}/>
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