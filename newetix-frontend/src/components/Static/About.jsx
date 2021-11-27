import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskCreate, helpdeskList } from '../../state/actions/actions';
import { borderRadius } from '@mui/system';
import eTixLogo from '../globalAssets/eTixLogo.png'

import images from '../globalAssets/scripts/bgchange';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${images()})`,
    },
    whole: {
        color: 'black',
        padding: '5px',
        borderRadius: '25px',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        backgroundColor: 'rgba(247, 213, 124, 0.75)',
        paddingTop: '50px',
        paddingBottom: '50px',
    },
    tf: {
        width: '550px'
    }
}));

function Privacy() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
                <Grid item>
                    <img src={eTixLogo} alt="logo" width="250px"/>
                    <Typography variant="h3" style={{paddingTop: '25px'}}>About eTix</Typography>
                </Grid>
                <Grid item sx={{width: '75%'}}>
                    <Typography variant="h6">
                        <Box textAlign ='left' m={1} style={{textAlign: 'center'}}>
                            <Typography variant="h4" style={{paddingTop: '15px'}}>
                                One Smooth Ticket for your Ultimate Journey<br />
                            </Typography>
                            <Typography variant="h5" style={{paddingTop: '15px'}}>
                                Satu Tiket yang Lancar untuk Perjalanan Utama Anda<br />
                                一張暢通無阻的車票，開啟您的終極旅程<br />
                                ஒரு மென்மையான பயணம் வேண்டும்<br /><br />
                            </Typography>
                        </Box>
                        <Box textAlign ='left' m={1}>
                            eTix is a bus ticket purchasing system developed by Pengeema Technologies made with convenience in mind. Our goal is we will always find a way to 
                            help the people all around the world with innovation.
                        </Box>
                        <Box textAlign ='left' m={1}>
                            Many problems faces by the transportation industry in this 21st century especially Covid-19 Pandemic in the current global. At eTix, 
                            We are promoting contactless services in order to achieve good hygiene among the people involved in the transportation industry in 
                            the new normal environment.
                        </Box>
                        <Box textAlign ='left' m={1}>
                            With good faith, eTix is made by Pengeema Technologies to boost tourism post-Covid and to boost economy of Malaysia. 
                            The team consists of Chew Zhi Peng, Ho Ko Ee, Matthew Labial John and of course CEO Ms. Rubiah binti Mohd Yunus.
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Card sx={{ width: 300 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            src="https://mmuexpert.mmu.edu.my/images/staff/1001080221.jpg"
                            alt="img"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Rubiah binti Mohd Yunus 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                CEO
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <Card sx={{ width: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image="https://media.discordapp.net/attachments/886595341829419018/891298876387106856/PicsArt_09-25-08.23.05.jpg?width=612&height=827"
                                    alt="img"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Ho Ko Ee
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Full Stack Developer
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ width: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image="https://media.discordapp.net/attachments/886595341829419018/890280686513172480/IMG_20210923_005418.jpg?width=598&height=827"
                                    alt="img"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Chew Zhi Peng
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Full Stack Developer & Team Leader
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ width: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image="https://media.discordapp.net/attachments/886595341829419018/892061532408659998/unknown.png?width=742&height=827"
                                    alt="img"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Matthew Labial John
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Front End Developer
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Privacy
