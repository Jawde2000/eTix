import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'white',
        padding: '5px'
    },
    tf: {
        width: '550px'
    }
}));

function Compose() {
    const classes = useStyles();

    const vendorList = useSelector(state => state.vendorList)

    const { vendorInfo } = vendorList

    async function testing(vendorInfo) {
        console.log(vendorInfo)
        var vendorNames = []
        for (var i of vendorInfo){
            vendorNames.push(vendorInfo[i].vendorNames)
        }
        return vendorNames
    }

    console.log(testing(vendorInfo))


    const [reciever, setreciever] = useState('Receiver');


    return (
        <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.whole}>
            <Grid item>
                <Typography variant="h3">Messaging System</Typography>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h5">Reciever:</Typography>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            className={classes.tf}
                            onChange={(event, newValue) => {
                                setreciever(newValue);
                            }}
                            id="receiverCombo"
                            options={testing}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="From" />}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h5">Subject:</Typography>
                    </Grid>
                    <Grid item>
                        <TextField className={classes.tf} label="Subject" variant="filled"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h5">Body:</Typography>
                    </Grid>
                    <Grid item>
                        <TextField className={classes.tf} label="Body" variant="filled" rows={10} multiline/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <Button variant="contained">Submit</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Inbox</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Compose
