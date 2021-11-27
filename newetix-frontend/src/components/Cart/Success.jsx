import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskCreate, helpdeskList } from '../../state/actions/actions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundColor: 'rgba(245, 203, 92, 0.75)',
        color: 'black',
        padding: '5px',
        borderRadius: '25px',
        paddingTop: '100px',
        paddingBottom: '100px',
    }
}));

function Success() {
    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">Payment Success!</Typography>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <CheckCircleOutlineIcon sx={{fontSize: '250px'}} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="h3">Thank you!</Typography>
                <Typography variant="h5">The ticket will be credited to your account shortly, please check your Activities page</Typography>
            </Grid>
        </Grid>
    );
}

export default Success
