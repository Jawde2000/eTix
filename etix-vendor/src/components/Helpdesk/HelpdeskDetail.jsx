import React, {useState, useEffect} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button, Toolbar} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link, useParams } from 'react-router-dom';
import { deleteHelp, getHelp, saveHelp, sendResponse } from '../../actions/helpActions/helpActions';
import { getUser } from '../../actions/userActions/userActions';
import { HELP_DELETE_RESET, HELP_DETAIL_RESET, HELP_SAVE_RESET , HELP_SEND_RESPONSE_RESET} from '../../constants/helpConstants/helpConstants';
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

const HelpdeskDetail = ({props}) => {
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

    const deleteHelplist = useSelector(state => state.deleteHelplist)
    const {success: deleteSuccess, error: deleteError} = deleteHelplist

    const [helpdesk, setHelpdesk] = useState()
    const [helpResponse, setHelpResponse] = useState()
    const [respondedUser, setRespondedUser] = useState()
    const [senderDetail, setSenderDetail] = useState()
    const [status, setStatus] = useState()
    const [viewReply, setViewReply] = useState(false);
    const [addMessage, setAddMessage] = useState(false);
    const [respondMessage, setRespondMessage] = useState("");
    const [respondedUsername, setRespondedUsername] = useState("");
    const [open, setOpen] = useState(false);
    const [sendRes, setSendRes] = useState();

    useEffect(() => {
        if(!userLogin){
            history.push("/");
        }
        if(!helpD || helpD.helpdeskID !== id){
            dispatch(getHelp(id))
            
        }else{
            setHelpdesk(helpD)
            if(helpD.helpdeskStatus ==="RP" || helpD.helpdeskStatus === "CL")
            {
                setHelpResponse(helpD.helpResponse.data)
                if(helpD.helpResponse.data){
                    setRespondedUser(helpD.respondUser.data)
                }
            }
            setStatus(helpD.helpdeskStatus)

            
        }

        if(!senderD && helpD){
            dispatch(getUser(helpD.user))
        }
        else{
            setSenderDetail(senderD)
        }
    }, [helpD, id, senderD])

    useEffect(() => {
        if(sendRes && !sendSuccess){
            dispatch(sendResponse(sendRes, status, id))
        }

        if(sendSuccess){
            alert("Send Respond Success")
            dispatch({type: HELP_SEND_RESPONSE_RESET});
            dispatch({type: USER_DETAIL_RESET});
            dispatch({type: HELP_DETAIL_RESET});
            history.push(`/menu/helpdesk`)
        }

    }, [sendRes, sendSuccess])

    useEffect(() => {
        if(respondedUser)
        {
            setRespondMessage(helpResponse.helpResponseMessage);
            setRespondedUsername(respondedUser.username);
        }
        
    }, [respondedUser])

    useEffect(() => {
        if(saveSuccess && !sendSuccess){
            alert("Saved successfully!");
            dispatch({type: HELP_SAVE_RESET});
            history.push(`/help/${id}`)
        }
        
    }, [saveSuccess])

    const DialogDelete = () => {
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
        const handleDelete = () => {
            dispatch(deleteHelp(id));
            handleClose();
        }

        return (
          <Toolbar>
            <Tooltip title="Delete" onClick={handleClickOpen}>
                <DeleteIcon fontSize="large"/>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Message(s)"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete the message(s)?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{color: "red"}} onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const DialogOk = () => {
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        return (
          <Toolbar>
            <Dialog
              open={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Notification"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Message(s) deleted
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

    useEffect(() => {
        if(deleteSuccess){
            dispatch({type: HELP_DELETE_RESET})
            dispatch({type: HELP_DETAIL_RESET});
            history.push('/menu/helpmanage');
            if (document.referrer !== document.location.href) {
                setTimeout(function() {
                    document.location.reload()
              }, 5000);
            }
        } else {
            return (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
            );
        }
    }, [deleteHelplist])

    const handleChangeStatus = (e) => {
       if(e === "Closed"){
            setStatus("CL");
       }
       else if(e === "Open"){
           setStatus("OP");
       }
       else if(e === "Responded"){
           setStatus("RP");
       }
    };

    const changeRespondMessage = (event) => {
        setRespondMessage(event.target.value);
    }

    const handleSendRespond = () => {
        setSendRes({
            helpResponseMessage: respondMessage,
            helpdesk: id,
            user: userInfo.userID
        })
        setStatus("RP")
    }

    const handleBack = () => {
        dispatch({type: USER_DETAIL_RESET});
        dispatch({type: HELP_DETAIL_RESET});
        history.push('/menu/helpdesk/');
    }

    const handleSave = () => {
        dispatch(saveHelp(id, status));
    }

    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            {console.log(helpdesk)}
            {console.log(helpResponse)}
            {
                !helpdesk?
                (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
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
                                Helpdesk ID: {id}
                            </Grid>
                            <Grid item xs={4} textAlign="right">
                                <Tooltip title="Save">
                                    <IconButton >
                                        <SaveIcon className={classes.functionicon} fontSize="large" onClick={handleSave}/>
                                    </IconButton>
                                </Tooltip>
                                
                                    {/* Set onclick delete here, *create a delete function* */}
                                    <IconButton>
                                        <DialogDelete className={classes.functionicon} />
                                    </IconButton>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box className={classes.box}>
                        <Grid container spacing={3} direction="column" style={{paddingLeft:30}}>
                            <Grid item xs={12} container>
                                {/* first column */}
                                <Grid item xs={12} sm={5} container>
                                    {/* username */}
                                    <Grid item xs={12} container>
                                        <Grid item xs={3}>
                                            User Name: 
                                        </Grid>
                                        <Grid item xs={9} textAlign="left">
                                            {senderD? senderD.username : null}
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
                                            defaultValue={helpdesk?helpdesk.helpdeskTitle: null}
                                            margin="dense"
                                            fullWidth
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
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
                                            value={helpdesk?helpdesk.helpdeskMessage : null}
                                            margin="dense"
                                            fullWidth
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                                style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                            }} 
                                        />   
                                    </Grid>
                                    {/* user information */}
                                    <Grid item xs={12} style={{marginTop: 20, fontWeight: 'bold'}}>
                                        User Information
                                    </Grid>
                                    <Grid item xs={12} container style={{marginTop: 10}}>
                                        <Grid item xs={3}>
                                            (Email)
                                        </Grid>
                                        <Grid item xs={9} style={{textAlign: 'left'}}>
                                            {senderDetail? senderDetail.email : null}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container style={{marginBottom: 30}}>
                                        <Grid item xs={3}>
                                            (Phone)
                                        </Grid>
                                        <Grid item xs={9} style={{textAlign: 'left'}}>
                                            {senderDetail? (senderDetail.is_customer? senderDetail.customerInfo.data.customerContact_Number : (senderDetail.is_vendor? senderDetail.vendorInfo.data.vendorContact_Number : null)) : null}
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} sm={1} />
                                {/* second column */}
                                <Grid item xs={12} sm={5} container>
                                    {/* status container */}
                                    <Grid item xs={12} container>
                                        <Grid item xs={2}>
                                            Status: 
                                        </Grid>
                                        <Grid item xs={10} style={status === "CL" ? ({color: "red"}) : ({color: "green"})}>
                                            {helpD.helpdeskStatus ==="RP" || helpD.helpdeskStatus === "CL"? 
                                                (
                                                    <Select
                                                        id="helpStatus"
                                                        value={status === "CL"? "Closed" : (status==="RP"? "Responded" : "Open")}
                                                        label="Status"
                                                        onChange={(e) => handleChangeStatus(e.target.value)}
                                                        style={{marginLeft: 10}}
                                                    >
                                                        <MenuItem value={"Responded"}>Responded</MenuItem>
                                                        <MenuItem value={"Closed"}>Closed</MenuItem>
                                                    </Select>
                                                )
                                                :
                                                (
                                                    <Select
                                                        id="helpStatus"
                                                        value={status === "CL"? "Closed" : (status==="RP"? "Responded" : "Open")}
                                                        label="Status"
                                                        onChange={(e) => handleChangeStatus(e.target.value)}
                                                        style={{marginLeft: 10}}
                                                    >
                                                        <MenuItem value={"Open"}>Open</MenuItem>
                                                    </Select>
                                                )
                                            }
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container style={{marginTop: 20,}}>
                                        <Grid item xs={2} style={{ fontWeight: 'bold'}}>
                                            Replies: 
                                        </Grid>
                                        <Grid item xs={10} style={{ textAlign: 'left'}}>
                                            {helpResponse? `Responded by ${respondedUsername}` : "Not yet Respond"} 
                                        </Grid>
                                    </Grid>
                                    {helpResponse ? 
                                        (
                                            <Grid item xs={12} container>
                                                {viewReply?
                                                    (
                                                        <Grid item xs={12} container> 
                                                            <Grid item xs={12} style={{marginTop: 20, fontWeight: 'bold'}}>
                                                                Message Body:
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField 
                                                                    id="respond-message" 
                                                                    variant="outlined"
                                                                    multiline
                                                                    minRows={6}
                                                                    value={helpResponse.helpResponseMessage}
                                                                    margin="dense"
                                                                    fullWidth
                                                                    size="small"
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                                    }} 
                                                                />   
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button onClick={()=>setViewReply(false)} variant="text">Unview Respond Message</Button>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                    :
                                                    <Grid item xs={12}>
                                                        <Button onClick={()=>setViewReply(!viewReply)} variant="text" style={{fontWeight: 'bold'}}>View Respond Message</Button>
                                                    </Grid>
                                                }
                                                
                                                
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid item xs={12} container>
                                                
                                                {addMessage?
                                                    (
                                                        <Grid xs={12} container>
                                                            <Grid item xs={12} style={{marginTop: 20, fontWeight: 'bold'}}>
                                                                Message Body:
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField 
                                                                    id="add-respond-message" 
                                                                    variant="outlined"
                                                                    multiline
                                                                    minRows={6}
                                                                    value={respondMessage}
                                                                    margin="dense"
                                                                    onChange={changeRespondMessage}
                                                                    fullWidth
                                                                    size="small"
                                                                    InputProps={{
                                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                                    }} 
                                                                />   
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button onClick={()=>handleSendRespond()} variant="text">Send Respond</Button>
                                                            </Grid>
                                                        </Grid>
                                                        
                                                    )
                                                    :
                                                    <Grid item xs={12}>
                                                        <Button onClick={()=>setAddMessage(!addMessage)} variant="text">Add Respond Message</Button>
                                                    </Grid>
                                                }
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />                            
                                </Grid>
                                <Grid item xs={12} sm={1} />
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

export default HelpdeskDetail
