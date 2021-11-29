import {  Grid, Box,  Link, Typography, Autocomplete, Container, CircularProgress, Toolbar, Button } from '@mui/material';
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
import Backdrop from '@mui/material/Backdrop';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundBlendMode: "lighten",
      minHeight: 700,
      fontFamily: ['rubik', 'sans-serif'].join(',')
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
    const {error: resetError, success: resetSuccess, loading: resetLoading} = passwordReset 

    const [email, setEmail] = useState("");
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userExistError, setUserExistError] = useState("");
    const [resetR, setResetR] = useState(false);

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
            setResetR(true);
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

    const DialogResetSuccess = () => {
        const handleClose = () => {
          setResetR(false);
          dispatch({type: VERIFY_USER_RESET});
          dispatch({type: RESET_USER_RESET});
          history.push('/passport');
        };
  
        return (
          <Toolbar>
            <Dialog
              open={resetR}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              {resetSuccess?
              <div style={{fontSize: 20, fontWeight: 'bolder', textAlign: 'center'}}>Successful Password Reset</div>:
              <div style={{fontSize: 20, fontWeight: 'bolder', textAlign: 'center'}}>Fail to Password Reset</div>
              }
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {resetSuccess?
                  <div>    
                  <Typography>Please check your email to get your temporary generated password</Typography>
                  </div>
                  :
                  <Typography>
                      Password Reset Fail...
                  </Typography>
                  }
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {resetSuccess?
                <Button onClick={handleClose} autoFocus style={{color: 'green'}}>
                  OK
                </Button>
                :
                <Button onClick={handleClose} autoFocus style={{color: 'red'}}>
                  OK
                </Button>
                }
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    return(
        <Container className={classes.whole} maxWidth="Fixed">
            <Container>
                <Grid container spacing={3} direction={'column'}>
                    <Grid item xs={12} container style={{marginTop: 100}}>
                        <Grid item xs={10} style={{margin: 'auto', backgroundColor: 'white', minHeight: 500, minWidth: 100, borderRadius: 10}}>
                            <h2 style={{textAlign: 'center', fontWeight: 'bold', color: '#F5CB5C', }}>Reset Your Password</h2>
                            {
                                emailFormatError?
                                (
                                    <Grid container>
                                    <Alert style={{textAlign: 'center'}} severity="error">Please enter a valid email!</Alert>
                                    </Grid>
                                )
                                :
                                (
                                    null
                                )
                            }
                            {
                                userExistError?
                                (
                                    <Alert severity="error">Email does not exist</Alert>
                                )
                                :
                                (
                                    null
                                )
                            }
                            <Grid item xs={12} container>

                                <Grid item xs={12} style={{textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), }}>
                                    <h3>
                                     Enter Your eTix Email Address:
                                    </h3>
                                </Grid>
                                <Grid container item xs={12} style={{ textAlign: 'center',paddingLeft: 220, paddingRight: 220}}>
                                    <TextField 
                                        id="Email" 
                                        variant="outlined"
                                        onChange={handleChangeEmail}
                                        value={email}
                                        textAlign="center"
                                        margin="dense"
                                        fullWidth
                                        type="email"
                                        required
                                        size="small"
                                        InputProps={{
                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: 'white',},
                                        inputProps: {
                                            style: { textAlign: "center" },
                                        }                        
                                        }}                                             
                                    /> 
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), fontStyle: 'italic', paddingTop: 20}}>
                                        <p style={{color: 'red'}}>*Please note that the email containing your new temporary password will be sent in 60 seconds.</p>
                                        <p>Please try again if you have not received the email after that period.</p>
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
            {
            resetLoading?
            <Box sx={{ display: 'flex' }}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress  style={{color: '#F5CB5C'}}/>    
            </Backdrop>
            </Box>
            :
            null
            }
            {
                resetR?<DialogResetSuccess />:null
            }
        </Container>
    )
}