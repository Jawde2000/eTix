import React, {useState, useEffect} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button, Toolbar} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link, useParams } from 'react-router-dom';
import { deleteHelp, getHelp, sendResponse, sendHelp } from '../../actions/helpActions/helpActions';
import { getUser } from '../../actions/userActions/userActions';
import { HELP_DELETE_RESET, HELP_DETAIL_RESET, HELP_SAVE_RESET , HELP_SEND_RESPONSE_RESET, HELP_SEND_HELP_RESET} from '../../constants/helpConstants/helpConstants';
import { USER_DETAIL_RESET } from '../../constants/userConstants/userConstants';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import moscow from '../globalAssets/moscow.jpg';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InboxIcon from '@mui/icons-material/Inbox';
import Backdrop from '@mui/material/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 500,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        minHeight: 400,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontSize:18
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
}));

const AddComment = ({props}) => {
    const classes = useStyles();

    const {id} = useParams();

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    let history = useHistory()
    
    const helpDetail = useSelector(state => state.helpDetail)
    const {loading: loadingHelp, helpD} = helpDetail

    const userDetail = useSelector(state => state.userDetail)
    const {loading: loadingSender, userD: senderD} = userDetail

    const helpSave = useSelector(state => state.helpSave)
    const {success: saveSuccess} = helpSave

    const helpSend = useSelector(state => state.helpSend)
    const {success: sendSuccess} = helpSend

    const sendHelpAdmin = useSelector(state => state.sendHelpAdmin)
    const {success: sendSuccessAdmin, loading: loadingSend} = sendHelpAdmin

    const [open, setOpen] = useState(false);
    const [title, setTitle] =useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(sendSuccessAdmin){
            // alert("Send Respond Success");
            setOpen(true);
        }
    }, [sendSuccessAdmin])

    const DialogAdmin = () => {
      
        const handleClose = () => {
          setOpen(false);
          history.push(`/menu/helpmanage`);
        };

        return (
          <Toolbar>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
                {"Notification"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The message have been successfully delivered to Administrator
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userInfo) {
            dispatch(sendHelp(title, message));
        }
    }

    const handleBack = () => {
        dispatch({type: HELP_SEND_HELP_RESET});
        history.push('/menu/helpmanage/');
    }

    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            {
                !userInfo?
                (
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress />
                    </Backdrop>
                )
                :
                (
                    <>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                        <Grid item xs={12} className={classes.action} container>
                            <Grid item xs={4}>
                                <Tooltip title="Back">
                                    <IconButton  onClick={handleBack}>
                                        <ArrowBackIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                                
                            </Grid>
                            <Grid item xs={4} textAlign="right" >
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box className={classes.box}>
                        <Grid container direction="column" style={{padding:50}}>
                            <Grid item xs={12} container>
                                {/* first column */}
                                    {/* username */}
                                    <Grid item xs={12} container>
                                        <Grid container>
                                            Company: {userInfo? userInfo.username : null}
                                        </Grid>
                                    </Grid>
                                    {/* Message subject */}
                                    <Grid item xs={12} style={{marginTop: 20, fontWeight: 'bold'}}>
                                        Message Subject:
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="message-subject" 
                                            variant="outlined"
                                            value={title}
                                            onChange={handleTitle}
                                            margin="dense"
                                            fullWidth
                                            required
                                            size="small"
                                            InputProps={{
                                                style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                            }} 
                                        />   
                                    </Grid>
                                    {/* Message body */}
                                    <Grid item xs={12} style={{marginTop: 20, fontWeight: 'bold'}}>
                                        Message Body:
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="message-subject" 
                                            variant="outlined"
                                            multiline
                                            minRows={6}
                                            value={message}
                                            onChange={handleMessage}
                                            margin="dense"
                                            fullWidth
                                            size="small"
                                            required
                                            InputProps={{
                                                style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                            }} 
                                        />   
                                    </Grid>
                                    {/* user information */}
                                    <Grid container xs={12} direction="row">
                                    <Grid item xs={10} style={{marginTop: 20, fontWeight: 'bold'}}>
                                        Company Information
                                    
                                    <Grid item xs={10} container style={{marginTop: 10}}>
                                        <Grid item>
                                            {userInfo? userInfo.email : null}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container style={{marginBottom: 30}}>
                                        <Grid item style={{textAlign: 'left'}}>
                                            {userInfo? userInfo.vendorInfo.vendorContact_Number:null}
                                        </Grid>
                                    </Grid>
                                    </Grid>
                                    <Grid item xs={2} container style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Grid>
                                        {message === ''? null:(<Button onClick={handleSubmit}>Send</Button>)}
                                    </Grid>
                                    <Grid>
                                        {
                                        sendSuccessAdmin? (<DialogAdmin />):null
                                        }
                                    </Grid>
                                    <Grid>
                                        {
                                            loadingSend? 
                                            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                                            <CircularProgress />
                                            </Backdrop>:null
                                        }
                                    </Grid>

                                    </Grid>
                                    </Grid>
                                {/* second column */}
                            </Grid>
                        </Grid>
                    </Box>    
                    </>
                )
            }
        </Container>
        </Container>
    )
}

export default AddComment
