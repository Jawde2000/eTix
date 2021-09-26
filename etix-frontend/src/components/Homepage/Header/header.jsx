import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, MenuIcon, makeStyles, colors, Tooltip, withStyles, Link} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';
// import HelpIcon from '@material-ui/icons/Help';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import './header.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: "#F5CB5C",
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

const useStyles = makeStyles((theme) => ({
    customizeAppbar: {
        minHeight: 30,
        background: 'rgb(36,36,35)',
        position: 'relative',
        paddingRight: 150,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        boxShadow: 'none'
    },
    customizeText: {
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


function Header() {

    const defaultStyle = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
    <div className={defaultStyle.headPosition}>
        <AppBar className={defaultStyle.customizeAppbar}>
                
            <div>
                {/*<Tooltip title="User">*/}
               <IconButton aria-controls="account" aria-haspopup="true" onClick={handleClick} className={defaultStyle.LoginButton} >
                   <AccountCircle htmlColor="#F5CB5C" className={defaultStyle.iconUser}/>
                   <Typography className={defaultStyle.customizeText}>
                   Register/Login
                   </Typography>
               </IconButton>
               <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <Link href="/profile" style={{textDecoration: 'none'}}>
        <StyledMenuItem >
          
          <ListItemIcon>            
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          
          <ListItemText primary="View Profile" />
          
        </StyledMenuItem>
        </Link>
        <Link href="/activities" style={{textDecoration: 'none'}}>
        <StyledMenuItem>
            
          <ListItemIcon>
            <LocalActivityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Activities" />
          
        </StyledMenuItem>
        </Link>
        <Link style={{textDecoration: 'none'}}>
        <StyledMenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
        </Link>
      </StyledMenu>
               {/*</Tooltip>*/}

               {/*<Tooltip title="notification">*/}
               {/* <IconButton aria-controls="account" aria-haspopup="true" onClick={handleClick} className={defaultStyle.customizeNoti}>
                    <NotificationsIcon htmlColor="#F5CB5C" className={defaultStyle.iconNoti}/>
                </IconButton>
                <Menu
                    id="account"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={defaultStyle.menuItem} onClick={handleClose}>No notifications</MenuItem>
                </Menu> */}
                {/*</Tooltip>*/}

                <IconButton className={defaultStyle.customizeRight}> 
                   <GroupWorkIcon htmlColor="#F5CB5C" fontSize="25"/>
                    <Typography className={defaultStyle.customizePartner}>
                        Partner with eTix
                    </Typography>
                </IconButton>

                <IconButton className={defaultStyle.customizeRight} href="/helpcentre"> 
                    <HelpCenterIcon htmlColor="#F5CB5C" fontSize="25" />
                    <Typography className={defaultStyle.customizeHelp}>
                        Help Centre
                    </Typography>
                </IconButton>

           </div>
        </AppBar>
    </div>
    );
}
 
export default Header;
