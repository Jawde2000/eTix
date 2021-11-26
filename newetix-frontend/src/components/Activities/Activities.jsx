import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import TicketActivities from './TicketActivities'
import CompletedTickets from './CompletedTickets'
import BoardingTickets from './BoardingTickets'
import { getTickets } from '../../state/actions/actions';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    inside: {
      paddingTop: '2.5%',
      paddingBottom: '2.5%'
    },
    sect: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'white'
    },
    articles: {
        width: '350px',
        height: '550px'
    },
    tf: {
        width: '550px'
    }
}));

function Activities() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {error,  userInfo} = userLogin
    const [filtered, setFiltered] = React.useState(false)
    const [all, setAll] = React.useState(true)

    let history = useHistory()
    dispatch(getTickets())

    useEffect(() => {
        if(!userInfo) {
            history.push('/')
        }
    },[userInfo])

    const handleAll = () => {
        setFiltered(false)
        setAll(true)
    }

    const handleBoarding = () => {
        setFiltered(false)
        setAll(false)
    }

    const handleUsed = () => {
        setFiltered(true)
        setAll(false)
    }

    return (
        <Box className={classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.inside}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <LocalActivityIcon fontSize='large' sx={{fontSize: '75px'}}></LocalActivityIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">Activities</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.articles}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{paddingTop:"25px"}} spacing={4}>
                                <Grid item>
                                    <Typography variant="h5" onClick={(() => {handleAll()})}>All</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" onClick={(() => {handleBoarding()})}>To Board</Typography>
                                </Grid>
                                <Grid item >
                                    <Typography variant="h5" onClick={(() => {handleUsed()})}>Completed</Typography>
                                </Grid>
                                <Grid item>
                                    <br /><br /><br /><br /><br /><br /><br /><br />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" onClick={(() => {history.push('/help')})}>Help Center</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} sx={{marginTop: '25px'}}>
                    {all? 
                        <TicketActivities />
                    :
                        <>
                            {setFiltered?
                                <BoardingTickets />
                            :
                                <CompletedTickets />
                            }
                        </>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default Activities
