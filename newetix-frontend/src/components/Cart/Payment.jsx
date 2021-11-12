import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Container } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskCreate, helpdeskList } from '../../state/actions/actions';
import images from '../globalAssets/scripts/bgchange';
import Summary from './Summary'
import PaymentIcon from '@mui/icons-material/Payment';


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

function Payment() {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    // const vendorList = useSelector(state => state.vendorList)



    return (
        <Box className={classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.inside}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <PaymentIcon fontSize='large' sx={{fontSize: '75px'}}/>
                                </Grid> 
                                <Grid item>
                                    <Typography variant="h4">Payment Summary</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.articles}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={6}>
                                <Grid item>
                                    <Typography variant="h4">Articles</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">How to purchase?</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">How to use eTix?</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">Card payments</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">Crypto payments</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">Digital tickets</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Summary />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Payment
