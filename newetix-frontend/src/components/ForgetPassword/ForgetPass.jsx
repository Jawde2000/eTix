import {  Grid, Box,  Link, Typography, Autocomplete, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from 'react';
import images from '../globalAssets/scripts/bgchange';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { resetPassword, validateUser } from '../../state/actions/actions';
import { useHistory } from 'react-router';
import { VERIFY_USER_RESET, RESET_USER_RESET } from '../../state/actions/actionConstants';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundBlendMode: "lighten",
      minHeight: 700
    },
    breadcrumbgrid: {
        paddingTop: '25px'
    },
    ac: {
        paddingTop: '15px',
        paddingBottom: '15px'
    }
}));


export default function ForgetPass() {

    const classes = useStyles();

    const dispatch = useDispatch();

    const verifyUser = useSelector(state => state.verifyUser)
    const {error: verifyError, UserExist: verifySuccess} = verifyUser

    const passwordReset = useSelector(state => state.passwordReset)
    const {error: resetError, success: resetSuccess} = passwordReset 

    const [email, setEmail] = useState("");
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userExistError, setUserExistError] = useState("");

    let history = useHistory()

    useEffect(() => {
        if(verifySuccess){
            setUserExistError("");
            console.log(verifySuccess);
            dispatch(resetPassword(email));
        }
        else{
            setUserExistError(verifyError);
            setLoading(false);
        }
    }, [verifyUser])

    useEffect(() => {
        if(resetSuccess){
            alert("Successfully Reseted Password. Please check you email.");
            dispatch({type: VERIFY_USER_RESET});
            dispatch({type: RESET_USER_RESET});
            history.push('/passport');
        } else {
            console.log("Fail to reset");
        }
    }, [passwordReset])

    const handleSubmit = (e) => {
        setLoading(true);

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) ) {        
            setEmailFormatError(false);
        }
        else {
            setEmailFormatError(true);
            setLoading(false);
            return;
        }

        dispatch(validateUser(email));
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    return(
        <Container className={classes.whole} maxWidth="Fixed">
            <Container>
                <Grid container spacing={3} direction={'column'}>
                    <Grid item xs={12} container style={{marginTop: 100}}>
                        <Grid item xs={12} style={{margin: 'auto', backgroundColor: 'grey', minHeight: 500, minWidth: 100}}>
                            <h2 style={{textAlign: 'center'}}>Forget Password</h2>
                            {
                                emailFormatError?
                                (
                                    <Alert severity="error">Please enter a valid email!</Alert>
                                )
                                :
                                (
                                    null
                                )
                            }
                            {
                                userExistError?
                                (
                                    <Alert severity="error">User does not exist</Alert>
                                )
                                :
                                (
                                    null
                                )
                            }
                            <Grid item xs={12} container>

                                <Grid item xs={12} style={{textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','),}}>
                                    <h3>
                                     Enter Email Address:
                                    </h3>
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: 'center',paddingLeft: 150, paddingRight: 150}}>
                                    <TextField 
                                        id="Email" 
                                        variant="outlined"
                                        onChange={handleChangeEmail}
                                        value={email}
                                        margin="dense"
                                        fullWidth
                                        type="email"
                                        required
                                        size="small"
                                        InputProps={{
                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: 'white', textAlign: 'center'}                        
                                        }}                                             
                                    /> 
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), fontStyle: 'italic', paddingTop: 20}}>
                                        <p>*Please note that the email containing your new temperory password will be sent in 60 seconds.</p>
                                        <p>Please Try again if you have not received the email after that period.</p>
                                </Grid>
                                <Grid item xs={12} container style={{margin: 'auto', paddingTop: 50}}>
                                    <Grid item xs={12} style={{textAlign: 'center'}}>
                                        <LoadingButton
                                            onClick={handleSubmit}
                                            endIcon={<SendIcon />}
                                            loading={loading}
                                            loadingPosition="end"
                                            variant="contained"
                                        >
                                            Reset Password
                                        </LoadingButton>
                                    </Grid>
                                                                         
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}