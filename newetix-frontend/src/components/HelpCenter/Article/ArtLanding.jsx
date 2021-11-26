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

function Art1() {
    const classes = useStyles();

    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">Help Articles</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Please select an Article on the left<br/><br/>
                </Typography>
            </Grid>
            <Grid item>
            </Grid>
        </Grid>
    );
}

export default Art1
