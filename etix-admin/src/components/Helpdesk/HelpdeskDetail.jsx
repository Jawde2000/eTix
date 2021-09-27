import React, {useState} from 'react'
import { Grid, Container, Box, Tooltip, IconButton } from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

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
    const [helpdesk, setHelpdesk] = useState({
        "helpdeskID" : "HP0124",
        "userName": "Mahiaddin",
        "messageSubject": "Crypto Purchase",
        "messageBody" : "I'm trying to purchase tickets via ETH but it doesn't want to accept it! Can someone help me?????",
        "userEmail": "mahiaddin@malaysia.gov.my",
        "userPhone": "+60123456789",
        "status" : "ACTIVE",
        "replies": false,
    });

    const changeStatus = () => {
        if(helpdesk.status === "Closed"){
            setHelpdesk({...helpdesk, status:"Active"});
            return;
        }
        setHelpdesk({...helpdesk, status:"Closed"});
    };

    return (
        <Container className={classes.root}>
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            {/* Should change it to Link after having the router setting */}
                            <IconButton  href="/helpdesks">
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Helpdesk ID: {helpdesk.helpdeskID}
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
                        <Grid item xs={12} sm={7} container>
                            <Grid item xs={2}>
                                User Name: 
                            </Grid>
                            <Grid item xs={10} textAlign="left">
                                {helpdesk.userName}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={5} container>
                            <Grid item xs={2}>
                                Status: 
                            </Grid>
                            <Grid item xs={10} style={helpdesk.status === "Closed" ? ({color: "red"}) : ({color: "green"})}>
                                <Tooltip title="Change status">
                                    <IconButton onClick={()=>changeStatus()}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                {helpdesk.status}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default HelpdeskDetail
