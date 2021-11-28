import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Grid, Link, Typography, Button, Menu, MenuItem, Fade, Avatar} from '@mui/material';
import { makeStyles } from '@mui/styles';

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from '@mui/icons-material/Notifications';

import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../../state/actions/actions';


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
    const dispatch = useDispatch()

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

    const handleClickLogout = (event) => {
        dispatch(logout())
        setAnchorElA(null);
    };

    const handleClickVP = (event) => {
        history.push('/profile')
    }

    const handleClickAC = (event) => {
        history.push('/activities')
    }

    const handleCloseA = () => {
      setAnchorElA(null);
    };

    let history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [imgSrc, setImgSrc] = useState();
    let found = false
    let i = 0

    useEffect(() => {
        if (userInfo){
            setImgSrc("https://etixbucket.s3.amazonaws.com/etix/" + userInfo.userID + ".jpeg")
        }
    }, [userInfo])
    
    const handleClickA = (event) => {
        if (!userInfo) {
            history.push('/passport')
        } else {
            setAnchorElA(event.currentTarget);
        }
    };

    return (
    <AppBar className={defaultStyle.customizeAppbar} position="relative">
        <Grid xs={12} container >
            <Grid xs={12} direction="column">
                <Grid xs={12}>
                    <Grid item className={defaultStyle.rightItem} direction="row" display="flex">   
                        <Grid item className={defaultStyle.rightItem}>
                            <Link href='http://localhost:3500' style={{ textDecorationLine: 'none', display: "flex", paddingTop: '11px', color: '#F5CB5C'}}>Partner with us!</Link>
                        </Grid>    
                        <Grid item className={defaultStyle.rightItem}>
                            <div>
                                <Button aria-controls="account" aria-haspopup="true" className={defaultStyle.LoginButton} display="flex" aria-expanded={openA ? 'true' : undefined} onClick={handleClickA}>
                                    {userInfo? <Avatar sx={{ bgcolor: "#F5CB5C" }} alt={userInfo.username} src={imgSrc} sx={{ width: 32, height: 32 }}/> : <Typography className={defaultStyle.customizeText} style={{textDecorationLine: 'none', display: "flex", color: '#F5CB5C'}}>Register/Login</Typography> }
                                    <Typography className={defaultStyle.customizeText} style={{fontFamily: ['rubik', 'sans-serif'].join(','),}}>
                                        {userInfo? userInfo.username : null} 
                                    </Typography>
                                </Button>
                                <Menu id="account" MenuListProps={{'aria-labelledby': 'account',}} anchorEl={anchorElA} open={openA} onClose={handleCloseA} TransitionComponent={Fade}>
                                    <MenuItem onClick={handleClickVP}>View Profile</MenuItem>
                                    <MenuItem onClick={handleClickAC}>Activities</MenuItem>
                                    <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
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
