import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundColor: 'rgba(245, 203, 92, 0.75)',
        color: 'black',
        padding: '5px',
        borderRadius: '25px'
    },
    tf: {
        width: '550px'
    }
}));

function Art2() {
    const classes = useStyles();

    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">How to find routes</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    To find a route to your destination, go to the home page, select the starting location, as well as the destination.<br/><br/>
                    Select a date for your journey<br/><br/>
                    Promptly press the search button and routes will be displayed to you
                </Typography>
            </Grid>
            <Grid item>
            </Grid>
        </Grid>
    );
}

export default Art2
