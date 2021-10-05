import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import "../Font/fonts.css"

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
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        paddingLeft:20,
    },
}));


const Service = ({props}) => {
    
    const classes = useStyles();
    const [service, setService] = useState({
        "serviceID" : "SBS0124",
        "startTerminus": "Terminal Bersepadu Selatan, KL",
        "endTerminus" : "Golden Mile Complex, Singpore",
        "busModel": "Mercedes-Benz Daimler 330",
        "plateNo": "N/A",
        "columns" : 4,
        "rows": 12,
        "date": "1/10/2021",
        "time": "16:20",
        "status": "Disabled"
    });
    const [editing, setEditing] = useState(false);
    
    // function to change service status, remember to update backend afterwards
    const changeStatus = () => {
       if(service.status === "Disabled"){
           setService({...service, status:"Active"});
           return;
       }
       setService({...service, status:"Disabled"});
    };
    
    return (
        <Container className={classes.root}>
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            {/* Should change it to Link after having the router setting */}
                            <IconButton  href="/services">
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Service ID: {service.serviceID}
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Tooltip title="Edit Service">
                            {/* Set onclick edit here  with props*/}
                            <IconButton onClick={() => setEditing(!editing)}>
                                <EditIcon className={classes.functionicon} fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Service">
                            {/* Set onclick delete here with props */}
                            <IconButton>
                                <DeleteIcon className={classes.functionicon} fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%'}} className={classes.box}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12} container>
                        <Grid item xs={12} sm={5} container textAlign="center">
                            <Grid item xs={12} >
                                Vender Logo
                            </Grid>
                            <Grid item xs={12}>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                                    alt="logo"
                                    style={{marginTop: 10,minHeight: 150, maxWidth:150}}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginTop: 10}}>
                                Status
                            </Grid>
                            {!editing ?
                                (<Grid item xs={12} style={service.status === "Disabled" ? ({color: "red"}) : ({color: "green"})}>
                                    {service.status}
                                </Grid>) 
                                : 
                                (<Grid item xs={12} style={service.status === "Disabled" ? ({color: "red"}) : ({color: "green"})}>
                                    <Tooltip title="Change status">
                                        <IconButton onClick={()=>changeStatus()}>
                                            <ChangeCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {service.status}
                                </Grid>)
                            }
                            {/* Note: Remember to do a feature for last update, this is just hardcode text */}
                            <Grid item xs={12} style={{marginTop: 20}}>
                                Last Updated:
                            </Grid>    
                            <Grid item xs={12} style={{marginTop: 5}}>
                                5/9/21 16:32
                            </Grid>
                            <Grid item xs={12} style={{marginTop: 10}}>
                                {service.serviceID}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={7} container textAlign='left' >
                            {
                                !editing?
                                (
                                    <>
                                        {/* Destination */}
                                        <Grid item xs={12} container >
                                            <Grid item xs={12} className={classes.title} >
                                                DESTINATION
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}}>
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Start Terminus:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.startTerminus}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    End Terminus:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.endTerminus}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* BUS INFORMATION */}
                                        <Grid item xs={12} container >
                                            <Grid item xs={12} className={classes.title} style={{paddingTop: 10}} >
                                                BUS INFORMATION
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}} >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Bus Model:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.busModel}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Plate No:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.plateNo}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container  >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Capacity:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.columns} columns x {service.rows} rows = {service.columns * service.rows} seats
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Timing Information */}
                                        <Grid item xs={12} container >
                                            <Grid item xs={12} className={classes.title} style={{paddingTop: 10}}>
                                                TIMING INFORMATION
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}}>
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Date:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.date}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Time:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.time}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Status:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.status}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {/* Destination */}
                                        <Grid item xs={12} container >
                                            <Grid item xs={12} className={classes.title} >
                                                DESTINATION
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}}>
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Start Terminus:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.startTerminus}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    End Terminus:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.endTerminus}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* BUS INFORMATION */}
                                        <Grid item xs={12} container >
                                            <Grid item xs={12} className={classes.title} style={{paddingTop: 10}} >
                                                BUS INFORMATION
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}} >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Bus Model:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.busModel}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Plate No:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.plateNo}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container  >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Capacity:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.columns} columns x {service.rows} rows = {service.columns * service.rows} seats
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Timing Information */}
                                        <Grid item xs={12} container >
                                            <Grid item xs={12} className={classes.title} style={{paddingTop: 10}}>
                                                TIMING INFORMATION
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}}>
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Date:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.date}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Time:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.time}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Status:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {service.status}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Service
