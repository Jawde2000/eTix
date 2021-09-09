import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton, MenuIcon, makeStyles, colors, Tooltip} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import './header.css';

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
    iconSize: {
        fontSize: 25,
        paddingLeft: 30
    },
    headPosition: {
        
    }
}));


function Header() {

    const defaultStyle = useStyles();
    return (
    <div className={defaultStyle.headPosition}>
        <AppBar className={defaultStyle.customizeAppbar}>
                
            <div>
                <Tooltip title="User">
               <IconButton className={defaultStyle.LoginButton} >
                   
                   <AccountCircle htmlColor="#F5CB5C" className={defaultStyle.iconSize}/>
                   <Typography className={defaultStyle.customizeText}>
                   Register/Login
                   </Typography>
               </IconButton>
               </Tooltip>

               <Tooltip title="notification">
               <IconButton className={defaultStyle.customizeNoti}>
                    <NotificationsIcon htmlColor="#F5CB5C" className={defaultStyle.iconSize}/>
                </IconButton>
                </Tooltip>

                <IconButton className={defaultStyle.customizeRight}> 
                    <GroupWorkIcon htmlColor="#F5CB5C" fontSize="25"/>
                    <Typography className={defaultStyle.customizePartner}>
                        Partner with eTix
                    </Typography>
                </IconButton>

                <IconButton className={defaultStyle.customizeRight}> 
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
