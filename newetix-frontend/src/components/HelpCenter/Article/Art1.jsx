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
                <Typography variant="h3">How to purchase</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    You can purchase a ticket easily via the eTix website.<br/><br/>
                    Before you do so, ensure you have signed up for an eTix account and added a local billing address.<br/><br/>
                    After searching for a product and deciding on what to buy, you can proceed to purchase in the following way:<br/><br/>
                    Add to cart and checkout <br/><br/>
                    On the route page, select the Add to Cart icon, select the preferred class to purchase, you will be greeted by an alert that says that the ticket has been added to the cart. It will then display the cart page<br/><br/>
                    You could immediately check out now via PayPal, or find more tickets to add to your cart<br/><br/>
                </Typography>
            </Grid>
            <Grid item>
            </Grid>
        </Grid>
    );
}

export default Art1
