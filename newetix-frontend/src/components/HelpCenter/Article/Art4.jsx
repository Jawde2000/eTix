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

function Art4() {
    const classes = useStyles();

    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">Digital Tickets</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Once a successful purchase, tickets will be credited to your eTix account, to view or print your ticket, there is two ways to do it.<br /><br />
                    1)	Confirmation Email<br />
                    There will be a direct link to your ticket in your confirmation email, simply click that in your email and you will be taken to your ticket page, as long as you have logged in, you can view and download the ticket as a pdf file<br /><br />
                    2)	Activities section<br />
                    You can select your profile dropdown on the Navigation Bar to show the Activities button, press that and you will be displayed the tickets you have purchased in the past, click the QR code button in order to show you the full ticket.<br /><br />
                </Typography>
            </Grid>
            <Grid item>
            </Grid>
        </Grid>
    );
}

export default Art4
