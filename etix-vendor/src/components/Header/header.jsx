import { AppBar, Grid, Typography, Button, Menu, MenuItem, Fade, Container, useIsFocusVisible} from '@mui/material';
import { makeStyles} from '@mui/styles';
import React, {useEffect, useState} from 'react';
import AccountCircle from "@material-ui/icons/AccountCircle";
// import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { logout, getUser } from '../../actions/userActions/userActions'
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  },
  customizeText: {
    paddingLeft: 5,
    color: '#F5CB5C',
    font: 'robo',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: ['rubik', 'sans-serif'].join(','),
    whiteSpace: "nowrap"
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

const Header = (props) => {
  const defaultStyle = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openD, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpenD = () => {
    setOpen(true);
  };

  const handleCloseD = () => {
    setOpen(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  let history = useHistory();

  function handleLogOut() {
    setAnchorEl(null);
    dispatch(logout())
    history.push("/"); // whichever component you want it to route to
  }

  function handleProfile() {
    history.push("/menu/profile"); // whichever component you want it to route to
    handleClose();
  }

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin

  const userDetail = useSelector(state => state.userDetail)
  const {userD} = userDetail

  const [name, setName] = useState(null);
  const [id, setID] = useState(null);

  useEffect(() => {
    setName(userInfo? userInfo.username:null);
    setID(userInfo? userInfo.userID:null);
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
                onClick={userInfo? handleClick: handleClickOpenD}
                >
                   {userInfo? (<Avatar style={{ height: '30px', width: '30px' }} src={"https://etixbucket.s3.amazonaws.com/etix/" + id + ".jpg"} />):(<AccountCircle htmlColor="#F5CB5C" className={defaultStyle.iconUser}/>)}
                   <Typography className={defaultStyle.customizeText}> 
                   {userInfo? name:"User"}
                   </Typography>
                </Button>
                </Container>
                {anchorEl? (<Menu
                id="account"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>)
                :
                (<Dialog
                fullScreen={fullScreen}
                open={openD}
                onClose={handleCloseD}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">
                  {"Notification"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                  Please log In to use this action
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseD} autoFocus>
                  OK
                </Button>
                </DialogActions>
                </Dialog>)
                }
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