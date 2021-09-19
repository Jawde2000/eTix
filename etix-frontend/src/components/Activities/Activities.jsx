import React, { Component } from 'react'
import {Box, makeStyles, Typography, Container, Grid, Button} from "@material-ui/core"
import dubai from '../cities/dubai.jpg'
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { alpha } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: 'url('+ dubai +')',
        backgroundRepeat: "no-repeat",
        position: "center",
        paddingBottom: 130,
        height: 700,
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    activities: {
        display: "flex",
        fontSize: 40,
        alignItems: "center",
        flexWrap: "wrap",
    },
    activitiesIcon: {
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
    },
    activity: {
        backgroundColor: "black",
        opacity: 0.5,
        height: "100%"
    },
}));


function Activities() {
    const defaultStyle = useStyles();

    return (
        <div>
            
            <Box className={defaultStyle.whole}>
                <Container>
                    <Grid container  className={defaultStyle.iconComponent} direction="column">
                    <Grid item xs={12} container>
                    <Grid item xs={3}>
                    <Typography className={defaultStyle.activities}>
                        <LocalActivityIcon className={defaultStyle.activitiesIcon}/>
                        Activities
                    </Typography>
                    </Grid>
                            
                    </Grid>
                    <Grid item xs={12} container>
                    <Box className={defaultStyle.listContainer}>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                       
                            <Typography className={defaultStyle.menufont}>
                            ALL
                            </Typography>
                       
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                        
                        <Typography className={defaultStyle.menufont}>
                            TO PAY
                            </Typography>
                       
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                        
                        <Typography className={defaultStyle.menufont}>
                            TO BOARD
                            </Typography>
                      
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                       
                        <Typography className={defaultStyle.menufont}>
                            COMPLETED
                        </Typography>
                   
                    </Grid>
                    </Box>
                    <Box className={defaultStyle.activitiy}>
                    <Grid item xs={12} container>                
                        <Grid item xs={12}>
                            <Box>
                                <Typography>
                                    Hello
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Typography>
                                    Hello
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>    
                    </Box>     

                    </Grid> 
                    </Grid>
                </Container>
            </Box>
            
        </div>
    );
}

export default Activities;