import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import { useHistory } from 'react-router';

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

function Art3() {
    const classes = useStyles()
    const history = useHistory()

    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">eTix Payments</Typography>
            </Grid>
            <Grid item>
                For more information, visit PayPal’s help center <br /><br />
                https://www.paypal.com/my/smarthelp/home
            </Grid>
            <Grid item>
            </Grid>
        </Grid>
    );
}

export default Art3
