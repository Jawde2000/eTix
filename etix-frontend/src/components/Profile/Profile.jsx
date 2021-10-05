import React, { Component, useState, useEffect} from 'react'
import {Box, makeStyles, Typography, Container, Grid, Button} from "@material-ui/core"
import moscow from '../cities/moscow.jpg'
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: 'url('+ moscow +')',
        backgroundRepeat: "no-repeat",
        position: "center",
        paddingBottom: 130,
        height: 700,
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    account: {
        display: "flex",
        fontSize: 35,
        alignItems: "center",
        flexWrap: "wrap",
    },
    accountIcon: {
        display: "flex",
        fontSize: 40,
        alignItems: "center",
        flexWrap: "wrap",
    },
    iconComponent: {
        paddingTop: theme.spacing(10),
    },
    menulist: {
        padding: theme.spacing(2),
    },
    menufont: {
        fontSize: 30,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        alignItems: "center",
        color: '#CFDBD5',
        fontWeight: "bold",
        '&:hover': {
            color: '#F5CB5C',
            fontWeight: "bold",
            cursor: "pointer",
        },
    },
    listContainer: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundColor: "black",
        opacity: 0.5,
        height: "100%"
    },
    activity: {
        backgroundColor: "black",
        opacity: 0.5,
        height: "100%"
    },
}));


function Profile() {
    const defaultStyle = useStyles();

    return (
        <div>
            
            <Box className={defaultStyle.whole}>
                <Container>
                    <Grid container  className={defaultStyle.iconComponent} direction="column">
                    <Grid item xs={12} container>
                    <Grid item xs={3}>
                    <Typography className={defaultStyle.account}>
                        <AccountBoxIcon className={defaultStyle.accountIcon}/>
                        PROFILE
                    </Typography>
                    </Grid>
                            
                    </Grid>
                    <Grid item xs={12} container>
                    <Grid item xs={3} container>
                    <Box className={defaultStyle.listContainer}>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                       <Grid item xs={12}>
                            <Typography className={defaultStyle.menufont}>
                            CHANGE
                            </Typography>
                            </Grid>
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                    <Grid item xs={12}>
                        <Typography className={defaultStyle.menufont}>
                            EMAIL
                            </Typography>
                            </Grid>
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                    <Grid item xs={12}>
                        <Typography className={defaultStyle.menufont}>
                            PASSWORD
                            </Typography>
                            </Grid>
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                    <Grid item xs={12}>
                        <Typography className={defaultStyle.menufont}>
                            BILLING 
                        </Typography>
                        </Grid>
                    </Grid>
                    </Box> 
                    </Grid>
                         
                    <Grid item xs={9} container>       
                    <Grid item xs={12}>         
                        <Box className={defaultStyle.listContainer}>

                        </Box>
                    </Grid>
                    </Grid>    
                        
                    </Grid> 
                    </Grid>
                </Container>
            </Box>
            
        </div>
    );
}

export default Profile;