import { AppBar, Grid, Typography, Button, Menu, MenuItem, Fade, Container} from '@mui/material';
import { makeStyles} from '@mui/styles';
import React, {useEffect, useState} from 'react';
import AccountCircle from "@material-ui/icons/AccountCircle";
// import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { logout, getUser } from '../../actions/userActions/userActions'
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
  customizeAppbar: {
    minHeight: 30,
    background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
    position: 'relative',
   
    fontFamily: ['rubik', 'sans-serif'].join(','),
    boxShadow: 'none'
  },
  display: {
    display: "flex",
    align: "center"
  },
  rightItem: {
    float: "right"
  },customizeText: {
    paddingLeft: 5,
    color: '#F5CB5C',
    font: 'robo',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: ['rubik', 'sans-serif'].join(','),
},
LoginButton: {
    float: 'right',
},
customizeNoti: {
    float: 'right'
},
customizePartner: {
    fontSize: 13,
    fontFamily: ['rubik', 'sans-serif'].join(','),
    color: '#F5CB5C',
},
customizeHelp: {
    fontSize: 13,
    fontFamily: ['rubik', 'sans-serif'].join(','),
    color: '#F5CB5C',
},
customizeRight: {
    float: 'right',
},
iconNoti: {
    fontSize: 25,
    paddingLeft: 30,
    paddingRight: 30
},
iconUser: {
    fontSize: 25,
},
menuItem: {
    fontFamily: ['rubik', 'sans-serif'].join(','),
    color: '#F5CB5C',
    backgroundColor: '#242423'
},
menu: {
    textDecoration: "none"
}
  
}));

const Header = () => {
  const defaultStyle = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()

  let history = useHistory();

  function handleLogOut() {
    dispatch(logout())
    history.push("/"); // whichever component you want it to route to
  }

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin

  const userDetail = useSelector(state => state.userDetail)
  const {userD} = userDetail

  const [username, setName] = useState(null);

  useEffect(() => {
    setName(userInfo.username);
  }, [userInfo])

  return (
          <AppBar className={defaultStyle.customizeAppbar} position="relative">
            <Grid xs={12} container >
              <Grid xs={12} direction="column">
              <Grid xs={12}>
                <Grid item className={defaultStyle.rightItem} direction="row" display="flex">       
                <Grid item sm={5} md={7}>
                <div>
                {/*<Tooltip title="User">*/}
                <Container>
                <Button aria-controls="account" aria-haspopup="true" className={defaultStyle.LoginButton} display="flex"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
                   {userInfo? (<Avatar style={{ height: '30px', width: '30px' }} src={"https://etixbucket.s3.amazonaws.com/etix/" + userInfo.userID + ".jpg"} />):(<AccountCircle htmlColor="#F5CB5C" className={defaultStyle.iconUser}/>)}
                   <Typography className={defaultStyle.customizeText}>
                      {userInfo? username:"User"}
                   </Typography>
                </Button>
                </Container>
                <Menu
                id="account"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                >
                <MenuItem onClick={'/menu/profile'}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Notification</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
                </div>
                </Grid>
                </Grid>
              </Grid>
              </Grid>
            </Grid>
          </AppBar>
  );

}

export default Header;