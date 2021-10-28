import React from 'react';
import { AppBar, Grid, Link, Typography, Button, Menu, MenuItem, Fade} from '@mui/material';
import { makeStyles } from '@mui/styles';

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from '@mui/icons-material/Notifications';


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
        float: "right",
        paddingRight: '75px'
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
    NotificationButton: {
        float: 'right'
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

function Top() {
    const defaultStyle = useStyles();

    const [anchorElN, setAnchorElN] = React.useState(null);
    const [anchorElA, setAnchorElA] = React.useState(null);

    const openN = Boolean(anchorElN);
    const openA = Boolean(anchorElA);

    const handleClickN = (event) => {
      setAnchorElN(event.currentTarget);
    };
    const handleCloseN = () => {
        setAnchorElN(null);
    };

    const handleClickA = (event) => {
        setAnchorElA(event.currentTarget);
    };
    const handleCloseA = () => {
      setAnchorElA(null);
    };

    return (
    <AppBar className={defaultStyle.customizeAppbar} position="relative">
        <Grid xs={12} container >
            <Grid xs={12} direction="column">
                <Grid xs={12}>
                    <Grid item className={defaultStyle.rightItem} direction="row" display="flex">   
                        <Grid item className={defaultStyle.rightItem}>
                            <Link href='' style={{ textDecorationLine: 'none', display: "flex", paddingTop: '11px', color: '#F5CB5C'}}>Partner with us!</Link>
                        </Grid>   
                        <Grid item className={defaultStyle.rightItem}>
                            <div>
                                <Button aria-controls="notifications" aria-haspopup="true" className={defaultStyle.NotificationButton} display="flex" aria-expanded={openN ? 'true' : undefined} onClick={handleClickN}>
                                    <NotificationsIcon htmlColor="#F5CB5C" className={defaultStyle.iconUser}/>
                                </Button>
                                <Menu id="notifications" MenuListProps={{'aria-labelledby': 'notifications',}} anchorEl={anchorElN} open={openN} onClose={handleCloseN} TransitionComponent={Fade}>
                                    <MenuItem onClick={handleCloseN}>No notifications yet!</MenuItem>
                                </Menu>
                            </div>
                        </Grid>    
                        <Grid item className={defaultStyle.rightItem}>
                            <div>
                                <Button aria-controls="account" aria-haspopup="true" className={defaultStyle.LoginButton} display="flex" aria-expanded={openA ? 'true' : undefined} onClick={handleClickA}>
                                    <AccountCircle htmlColor="#F5CB5C" className={defaultStyle.iconUser}/>
                                    <Typography className={defaultStyle.customizeText} style={{fontFamily: ['rubik', 'sans-serif'].join(','),}}>
                                        USER
                                    </Typography>
                                </Button>
                                <Menu id="account" MenuListProps={{'aria-labelledby': 'account',}} anchorEl={anchorElA} open={openA} onClose={handleCloseA} TransitionComponent={Fade}>
                                    <MenuItem onClick={handleCloseA}>View Profile</MenuItem>
                                    <MenuItem onClick={handleCloseA}>Activities</MenuItem>
                                    <MenuItem>Logout</MenuItem>
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

export default Top;
