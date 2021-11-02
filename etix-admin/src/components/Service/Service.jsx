import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import "../Font/fonts.css"
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceDetail, deleteService } from '../../actions/serviceActions';
import { SERVICE_DETAIL_RESET } from '../../constants/serviceConstants';
import { useHistory } from 'react-router';
import moscow from '../globalAssets/moscow.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 700,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginTop: 20,
        
        borderRadius: 5,
        minHeight: 500,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
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
        paddingBottom: 5
    },
}));


const Service = ({props}) => {
    
    const classes = useStyles();

    const {id} = useParams();

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    let history = useHistory()

    const serviceDetail = useSelector(state => state.serviceDetail)
    const {serviceD} = serviceDetail

    const serviceDelete = useSelector(state => state.serviceDelete)
    const {success: successDelete} = serviceDelete

    const [serviceName, setServiceName] = useState("")
    const [serviceDesc, setServiceDesc] = useState("")
    const [status, setStatus] = useState("")
    const [time, setTime] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [departure, setDeparture] = useState("")
    const [arrival, setArrival] = useState("")
    const [route, setRoute] = useState("")
    const [vendorName, setVendorName] = useState("")
    const [firstQty, setFirstQty] = useState()
    const [businessQty, setBusinessQty] = useState()
    const [economyQty, setEconomyQty] = useState()
    const [firstPrice, setFirstPrice] = useState()
    const [businessPrice, setBusinessPrice] = useState()
    const [economyPrice, setEconomyPrice] = useState()
    const [capacity, setCapacity] = useState()

    useEffect(() => {
        if(!userLogin){
            history.push("/");
        }
        
        if(!serviceD || serviceD.serviceID !== id){
            dispatch(getServiceDetail(id))
            
        }else {
            setServiceName(serviceD.serviceName)
            setServiceDesc(serviceD.serviceDesc)
            setStatus(serviceD.serviceStatus)
            setTime(serviceD.serviceTime)
            setStartDate(serviceD.serviceStartDate)
            setEndDate(serviceD.serviceEndDate)
            setDeparture(serviceD.servicedepartureTerminal)
            setArrival(serviceD.servicearrivalTerminal)
            setRoute(serviceD.route)
            setVendorName(serviceD.vendorName)
            setFirstQty(serviceD.firstQty)
            setFirstPrice(serviceD.firstPrice)
            setBusinessQty(serviceD.businessQty)
            setBusinessPrice(serviceD.businessPrice)
            setEconomyQty(serviceD.economyQty)
            setEconomyPrice(serviceD.economyPrice)
            setCapacity(serviceD.capacity)
        }
    }, [serviceD,id])
    
    const [service, setService] = useState({
        "serviceID" : "SBS0124",
        "vendorName": "SBS Transit Sdn Bhd",
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

    const handleBack = () => {
        dispatch({type: SERVICE_DETAIL_RESET});
        history.push("/menu/servicemanagement");
    }
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Container>
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            <IconButton>
                                <ArrowBackIcon fontSize="large" onClick={handleBack}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Service ID: {id}
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
                                (<Grid item xs={12} style={status === "X" ? ({color: "red"}) : ({color: "green"})}>
                                    {status ==="O"? "Active" : "Closed"}
                                </Grid>) 
                                : 
                                (<Grid item xs={12} style={status === "X" ? ({color: "red"}) : ({color: "green"})}>
                                    <Tooltip title="Change status">
                                        <IconButton onClick={()=>changeStatus()}>
                                            <ChangeCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {status === "O"? "Active" : "Closed"}
                                </Grid>)
                            }
                            <Grid item xs={12} container>
                                <Grid item xs={12} sm={5} className={classes.title} style={{textAlign: 'right'}}>
                                    Vendor: 
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={12} sm={6} style={{textAlign: 'left'}}>
                                    {vendorName}
                                </Grid>
                            </Grid>
                            {!editing?
                                null
                                :
                                (
                                    <>
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                    </>
                                )
                            }
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
                                                    {departure}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    End Terminus:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {arrival}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Route:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {route}
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
                                                    {serviceName}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Description:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {serviceDesc}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container  >
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{fontWeight: "bold"}}>
                                                    Seat Capacity
                                                </Grid>
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}}>
                                                    First Class: {firstQty}
                                                </Grid>
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}}>
                                                    Business Class: {businessQty}
                                                </Grid>
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}}>
                                                    Economy: {economyQty}
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
                                                    Start Date:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {startDate}
                                                </Grid>
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    End Date:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {endDate}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Time:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {time}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Status:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    {status === "O"? "Active" : "Closed"}
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
                                                <Grid item xs={12} sm={9} className={classes.subtitle} style={{paddingRight: 20}}>
                                                    <TextField 
                                                        id="depart" 
                                                        variant="outlined"
                                                        value={departure}
                                                        // margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                        }} 
                                                    />  
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    End Terminus:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle} style={{paddingRight: 20}}>
                                                    <TextField 
                                                        id="arrival" 
                                                        variant="outlined"
                                                        value={arrival}
                                                        // margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Route:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle} style={{paddingRight: 20}}>
                                                    <TextField 
                                                        id="route" 
                                                        variant="outlined"
                                                        value={route}
                                                        // margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
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
                                                <Grid item xs={12} sm={9} className={classes.subtitle} style={{paddingRight: 20}}>
                                                    <TextField 
                                                        id="bus model" 
                                                        variant="outlined"
                                                        value={serviceName}
                                                        // margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Description No:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle} style={{paddingRight: 20}}>
                                                    <TextField 
                                                        id="Desc" 
                                                        variant="outlined"
                                                        value={serviceDesc}
                                                        // margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container  >
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{fontWeight: "bold"}}>
                                                    Seat Capacity
                                                </Grid>
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                                    <Grid item xs={5} style={{paddingTop: 15}}>
                                                        First Class: 
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <TextField 
                                                            id="firstQty" 
                                                            variant="outlined"
                                                            value={firstQty}
                                                            // margin="dense"
                                                            type="number"
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),  maxWidth: 50}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                                    <Grid item xs={5} style={{paddingTop: 15}}>
                                                        Business Class: 
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <TextField 
                                                            id="busiQty" 
                                                            variant="outlined"
                                                            value={businessQty}
                                                            // margin="dense"
                                                            type="number"
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),  maxWidth: 50}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                                    <Grid item xs={5} style={{paddingTop: 15}}>
                                                        Economy: 
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <TextField 
                                                            id="ecoQty" 
                                                            variant="outlined"
                                                            value={economyQty}
                                                            // margin="dense"
                                                            type="number"
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 50}
                                                            }} 
                                                        />
                                                    </Grid>
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
                                                    Start Date:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    <TextField 
                                                        id="start" 
                                                        variant="outlined"
                                                        value={startDate}
                                                        // margin="dense"
                                                        type="date"
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container style={{paddingTop: 10}}>
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    End Date:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle}>
                                                    <TextField 
                                                        id="end" 
                                                        variant="outlined"
                                                        value={endDate}
                                                        // margin="dense"
                                                        type="date"
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container >
                                                <Grid item xs={12} sm={3} className={classes.subtitle}>
                                                    Departure Time:
                                                </Grid>
                                                <Grid item xs={12} sm={9} className={classes.subtitle} style={{paddingBottom:20}}>
                                                    <TextField 
                                                        id="depart-time" 
                                                        variant="outlined"
                                                        value={time}
                                                        // margin="dense"
                                                        type="time"
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                                        }} 
                                                    />
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
        </Container>
    )
}

export default Service
