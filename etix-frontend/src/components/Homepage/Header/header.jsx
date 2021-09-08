import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton, MenuIcon, makeStyles, colors, Tooltip} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const useStyles = makeStyles((theme) => ({
    customizeAppbar: {
        minHeight: 30,
        background: 'hsla(60, 1%, 14%, 1)',
        position: 'relative'
    },
    customizeText: {
        paddingLeft: 20,
        color: '#CFDBD5',
        font: 'robo',
        fontSize: 10,
        fontWeight: 'bold'
    },
    LoginButton: {
        float: 'right',
    },
    customizeNoti: {
        float: 'right'
    },
    customizePartner: {
        fontSize: 10,
        font: 'robo',
        color: '#CFDBD5',
    },
    customizeHelp: {
        fontSize: 10,
        font: 'robo',
        color: '#CFDBD5',
    },
    customizeRight: {
        float: 'right',
    },
    iconSize: {
        fontSize: 'medium'
    }
}));


function Header() {

    const defaultStyle = useStyles();
    return (
    <div>
        <AppBar className={defaultStyle.customizeAppbar}>
                
            <div>
                <Tooltip title="User">
               <IconButton className={defaultStyle.LoginButton} >
                   
                   <AccountCircle htmlColor="#FFFFFF" className={defaultStyle.iconSize}/>
                   <Typography className={defaultStyle.customizeText}>
                   Register/Login
                   </Typography>
               </IconButton>
               </Tooltip>

               <Tooltip title="notification">
               <IconButton className={defaultStyle.customizeNoti}>
                    <NotificationsIcon htmlColor="#FFFFFF" className={defaultStyle.iconSize}/>
                </IconButton>
                </Tooltip>

                <IconButton className={defaultStyle.customizeRight}> 
                    <GroupWorkIcon htmlColor="#FFFFFF" fontSize="small"/>
                    <Typography className={defaultStyle.customizePartner}>
                        Partner with eTix
                    </Typography>
                </IconButton>

                <IconButton className={defaultStyle.customizeRight}> 
                    <HelpCenterIcon htmlColor="#FFFFFF" fontSize="small" />
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
