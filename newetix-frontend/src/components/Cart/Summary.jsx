import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskCreate, helpdeskList } from '../../state/actions/actions';
import { borderRadius } from '@mui/system';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


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

function Compose() {

    const paypal = useRef()
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const paymentInfo = useSelector(state => state.paymentInfo)
    const {priceInfo} = paymentInfo
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (priceInfo) {
            setTotal(priceInfo.total)
        }
    }, [priceInfo])

    const initOptions = {
        "client-id": "AdiCENp3VtTCDILgIkgrDQ-5dhKF410aCM5wYpaadmVSRP8rSJL3-W26PiRBulh2Nq4PiWx2YE3O1LBH",
        currency: "MYR",
        intent: "capture",
        total: total
    };
    

    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">Payment</Typography>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                <PayPalScriptProvider options={initOptions}>
                    <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
                </Grid>
            </Grid>
            
        </Grid>
    );
}

export default Compose
