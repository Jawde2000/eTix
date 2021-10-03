import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Menu, MenuItem, Fade} from '@mui/material';
import { makeStyles, withStyles} from '@mui/styles';
import React from 'react';
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';
// import HelpIcon from '@material-ui/icons/Help';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  customizeAppbar: {
    minHeight: 30,
    background: 'linear-gradient(to right, rgb(65, 41, 90), rgb(47, 7, 67))',
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

function logout() {
  localStorage.clear();
  window.location.href = '/';
}

function Header() {
  const defaultStyle = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let history = useHistory();

  function handleLogOut() {
    sessionStorage.setItem("userToken", '');
    sessionStorage.clear();
    history.push("/"); // whichever component you want it to route to
  }

  return (
          <AppBar className={defaultStyle.customizeAppbar} position="relative">
            <Grid xs={12} container >
              <Grid xs={12} direction="column">
              <Grid xs={12}>
                <Grid item className={defaultStyle.rightItem} direction="row" display="flex">       
                <Grid item sm={5} md={7}>
                <div>
                {/*<Tooltip title="User">*/}
                <Button aria-controls="account" aria-haspopup="true" className={defaultStyle.LoginButton} display="flex"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
                   <AccountCircle htmlColor="#F5CB5C" className={defaultStyle.iconUser}/>
                   <Typography className={defaultStyle.customizeText}>
                   Zhipeng
                   </Typography>
                </Button>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
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