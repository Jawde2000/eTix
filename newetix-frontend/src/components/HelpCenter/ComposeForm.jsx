import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskCreate, helpdeskList } from '../../state/actions/actions';
import { borderRadius } from '@mui/system';


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
    const classes = useStyles();
    let history = useHistory()
    const dispatch = useDispatch()
    const vendorList = useSelector(state => state.vendorList)
    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const { vendorInfo } = vendorList

    function vendorlistName(vendorInfo){
        let nameArray = [];

        for (let key in vendorInfo){
            nameArray.push(vendorInfo[key].vendorName)
        }

        nameArray.push('eTix')

        return nameArray
    }

    const [receiver, setReceiver] = useState(vendorlistName[0])
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    function onClickSubmit(){
        dispatch(helpdeskCreate(receiver, subject, body))
        dispatch(helpdeskList())
        history.push('/help/inbox')
    }

    const handleBodyChanges = (event) => {
        setBody(event.target.value)
    }

    const handleSubjectChanges = (event) => {
        setSubject(event.target.value)
    }


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
                                setReceiver(newValue);
                            }}
                            options={vendorlistName(vendorInfo)}
                            id="receiverCombo"
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
                        <TextField className={classes.tf} onChange={handleSubjectChanges} label="Subject" variant="filled"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h5">Body:</Typography>
                    </Grid>
                    <Grid item>
                        <TextField className={classes.tf} onChange={handleBodyChanges} label="Body" variant="filled" rows={10} multiline/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
                    <Grid item>
                        <Button variant="contained" onClick={() => {onClickSubmit()}}>Submit</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => {dispatch(helpdeskList()); history.push('/help/inbox')}}>Inbox</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Compose
