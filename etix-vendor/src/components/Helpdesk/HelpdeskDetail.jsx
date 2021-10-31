import React, {useState, useEffect} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link, useParams } from 'react-router-dom';
import { getHelp } from '../../actions/helpActions/helpActions';
import { getUser } from '../../actions/userActions/userActions';
import { HELP_DETAIL_RESET } from '../../constants/helpConstants/helpConstants'
import { USER_DETAIL_RESET } from '../../constants/userConstants/userConstants';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 500,
        fontFamily: ['rubik', 'sans-serif'].join(',')
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
    
    // let history = useHistory()
    
    const helpDetail = useSelector(state => state.helpDetail)
    const {loading: loadingHelp, helpD} = helpDetail

    const userDetail = useSelector(state => state.userDetail)
    const {loading: loadingSender, userD: senderD} = userDetail

    const [helpdesk, setHelpdesk] = useState()
    const [helpResponse, setHelpResponse] = useState()
    const [respondedUser, setRespondedUser] = useState()
    const [senderDetail, setSenderDetail] = useState()
    const [status, setStatus] = useState()
    const [viewReply, setViewReply] = useState(false);
    const [addMessage, setAddMessage] = useState(false);
    const [respondMessage, setRespondMessage] = useState("");
    const [respondDateTime, setRespondDateTime] = useState("");
    const [respondedUsername, setRespondedUsername] = useState("");

    useEffect(() => {
        if(!helpD || helpD.helpdeskID !== id){
            dispatch(getHelp(id))
        }else{
            setHelpdesk(helpD)
            if(helpD.helpdeskStatus ==="CL")
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
    }, [helpD, id])

    useEffect(() => {
        if(respondedUser)
        {
            setRespondMessage(helpResponse.helpResponseMessage);
            setRespondDateTime(helpResponse.helpResponseDateTime);
            setRespondedUsername(respondedUser.username);
        }
        
    }, [respondedUser])

    // const [helpdesk, setHelpdesk] = useState({
    //     "helpdeskID" : "HP0124",
    //     "userName": "Mahiaddin",
    //     "messageSubject": "Crypto Purchase",
    //     "messageBody" : "I'm trying to purchase tickets via ETH but it doesn't want to accept it! Can someone help me?????",
    //     "userEmail": "mahiaddin@malaysia.gov.my",
    //     "userPhone": "+60123456789",
    //     "status" : "ACTIVE",
    //     "replies": false,
    // });
    
    

    const changeStatus = () => {
       setStatus(!status)
    };

    const changeRespondMessage = (event) => {
        setRespondMessage(event.target.value);
    }

    const handleSendRespond = () => {
        setHelpdesk({...helpdesk, replies: true, respondMessage: respondMessage});
        setAddMessage(false);
    }

    return (
        <Container className={classes.root}>
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
                                    <Link to="/menu/helpdesk">
                                        <IconButton  href="/menu/helpdesk">
                                            <ArrowBackIcon fontSize="large" />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                                Helpdesk ID: {id}
                            </Grid>
                            <Grid item xs={4} textAlign="right">
                                <Tooltip title="Reply Help Message">
                                    {/* Set onclick and go to the reply page here */}
                                    <IconButton >
                                        <ReplyIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Help Message">
                                    {/* Set onclick delete here, *create a delete function* */}
                                    <IconButton>
                                        <DeleteIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
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
                                            User: 
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
                                            <Tooltip title="Change status">
                                                <IconButton onClick={()=>changeStatus()}>
                                                    <ChangeCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {status}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container style={{marginTop: 20,}}>
                                        <Grid item xs={2} style={{ fontWeight: 'bold'}}>
                                            Replies: 
                                        </Grid>
                                        <Grid item xs={10} style={{ textAlign: 'left'}}>
                                            {helpResponse? "Responded" : "Not yet Respond"} 
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
                                                        <Button onClick={()=>setViewReply(!viewReply)} variant="text">View Respond Message</Button>
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
    )
}

export default HelpdeskDetail
