import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, TextField, Button, Toolbar, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import moscow from '../globalAssets/moscow.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';
import { getLocationDetail, getVendorDetail, addNewService} from '../../actions/serviceActions/serviceActions';
import { useEffect } from 'react';
import { LOCATION_DETAIL_RESET, SERVICE_ADD_RESET} from '../../constants/serviceConstants/serviceConstants';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import "../Font/fonts.css"
import { minWidth } from '@mui/system';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 750,
        padding: 20,
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginTop: 20,
        marginBottom: 40,
        borderRadius: 5,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20,
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
    title: {
        fontWeight: 'bold',
        paddingTop:15,
    },
    subtitle: {
        paddingLeft:30,
    },
}));


const AddService = () => {
    
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const locationDetail = useSelector(state => state.locationDetail);
    const {locationD} = locationDetail;

    const serviceAdd = useSelector(state => state.serviceAdd);
    const {success: addSuccess} = serviceAdd;

    const [locations, setLocations] = useState();

    const [seat, setSeat] = useState();
    const [service, setService] = useState();
    const [fillAll, setFillAll] = useState(false);

    useEffect(() => {
        if(!userInfo){
            history.push('/')
        }else  {
            dispatch(getLocationDetail())
        }
    }, [userLogin])

    useEffect(() => {
        if(locationD){
            setLocations(locationD)
        }
    }, [locationDetail])

    const handleSubmit = () =>{
        if(!serviceName || !serviceDesc || !fQty || !fPrice || !bPrice || !bQty || !ePrice || !eQty || !departure || !arrival || !time || !locationTo || !locationFrom){
            setFillAll(true);
            return;
        }
        if(!startDate || !endDate){
            alert("Service start date and end date is required");
            return;
        }

        let x = new Date(startDate)
        let y = new Date(endDate)

        var seatt = [];
        var servicee = [];

        while(x <= y){
            seatt.push({
                firstQuantity: fQty,
                businessQuantity: bQty,
                economyQuantity: eQty,
                firstPrice: Number(fPrice).toFixed(2),
                businessPrice: Number(bPrice).toFixed(2),
                economyPrice: Number(ePrice).toFixed(2),
            })
           
            servicee.push({
                serviceName : serviceName,
                serviceDesc : serviceDesc,
                serviceStatus: status,
                serviceTime: time,
                serviceFrequency: "O",
                serviceStartDate: x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate(),
                serviceEndDate: x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate(),
                servicedepartureTerminal: departure,
                vendor: userInfo.vendorInfo.vendorID,
                servicearrivalTerminal: arrival,
                locationTo: locationTo,
                locationFrom: locationFrom,
            })

            //increment
            let newDate = x.setDate(x.getDate() + 1)
            x = new Date(newDate);
        }

        setSeat(seatt)
        setService(servicee)
    }

    useEffect(() => {
        if(service && seat){
            for(let i in seat){
                dispatch(addNewService(seat[i], service[i]))
            }
        }
        
    }, [service])

    useEffect(() => {
        if(addSuccess){
            alert("Successfully added");
            dispatch({type: LOCATION_DETAIL_RESET})
            dispatch({type: SERVICE_ADD_RESET})
            history.push('/menu/servicemanagement')
        }
    }, [serviceAdd])



    
    const [status, setStatus] = useState("X")
    const [fPrice, setFPrice] = useState()
    const [fQty, setFQty] = useState()
    const [bPrice, setBPrice] = useState()
    const [bQty, setBQty] = useState()
    const [ePrice, setEPrice] = useState()
    const [eQty, setEQty] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [time, setTime] = useState()
    const [serviceName, setServiceName] = useState("")
    const [serviceDesc, setServiceDesc] = useState("")
    const [locationFrom, setLocationFrom] = useState("")
    const [locationTo, setLocationTo] = useState("")
    const [departure, setDeparture] = useState("")
    const [arrival, setArrival] = useState("")
    var tomorrow = moment().add(1, 'days').format(moment.HTML5_FMT.DATE);

    const handleChangeStatus = () => {
        if(status === "O"){
            setStatus("X");
        }
        else{
            setStatus("O")
        }
    }

    const handleChangeFrom = (e) => {
        setLocationFrom(e.target.value)
    }

    const handleChangeTo = (e) => {
        setLocationTo(e.target.value)
    }

    const handleEndDate = (e) => {
        let x = new Date(startDate);
        let y = new Date(e.target.value);

        if(y>=x){
            setEndDate(e.target.value)
        }
        else {
            alert("End date can't be earlier than start date!")
            setEndDate("")
        }
    }

    const handleStartDate = (e) => {
        let x = new Date(e.target.value);
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let y = new Date(date);

        if(x>=y){
            setStartDate(e.target.value);
        }
        else{
            setStartDate("");
        }
    }

    const DialogNotFillAll = () => {
        const handleClose = () => {
          setFillAll(false);
        };
  
        return (
          <Toolbar>
            <Dialog
              open={fillAll}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Fill in all the required field before submitting</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus style={{color: 'red'}}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Container>
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            <Link to="/menu/servicemanagement/">
                                <IconButton>
                                    <ArrowBackIcon fontSize="large" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Add Service
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%'}} className={classes.box}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12} container>
                    <Grid item xs={12} sm={5} container textAlign="center">
                        <Grid item xs={12} style={status === "X"? ({color: "red"}) : ({color: "green"})}>
                            <Tooltip title="Change status">
                                <IconButton onClick={handleChangeStatus}>
                                    <ChangeCircleIcon />
                                </IconButton>
                            </Tooltip>
                            {status === "O"? "Active" : "Inactive"}                
                        </Grid>
                        <Grid item xs={12} container>
                        </Grid>
                        <Grid item xs={12} container >
                            <Grid item xs={12} container className={classes.subtitle}>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container>
                            <Grid item xs={12} className={classes.title} style={{textAlign: 'left'}}>
                                Date/Service Duration:
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container >
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Start Date:
                                </Grid>
                                <Grid item xs={7} >
                                    <TextField 
                                        id="start" 
                                        variant="outlined"
                                        onChange={handleStartDate}
                                        value={startDate}
                                        margin="dense"
                                        fullWidth
                                        required
                                        type="date"
                                        size="small"
                                        InputProps={{
                                            min: tomorrow,
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    End Date:
                                </Grid>
                                <Grid item xs={7} >
                                    <TextField 
                                        id="end" 
                                        variant="outlined"
                                        onChange={handleEndDate}
                                        value={endDate}
                                        margin="dense"
                                        fullWidth
                                        required
                                        type="date"
                                        size="small"
                                        InputProps={{
                                            min: tomorrow,
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        

                        <Grid item xs={12} />
                        <Grid item xs={12} />
                        <Grid item xs={12} />
                        <Grid item xs={12} />
                        <Grid item xs={12} />
                        <Grid item xs={12} />
                        <Grid item xs={12} />
                    </Grid>
                    <Grid item xs={12} sm={7} container textAlign="center">
                        <Grid item xs={12} container>
                            <Grid item xs={12} className={classes.title} style={{textAlign: 'left'}}>
                                Bus Information
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container >
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}} >
                                    Bus Name/Model:
                                </Grid>
                                <Grid item xs={8} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="busname" 
                                        variant="outlined"
                                        onChange={(e) => setServiceName(e.target.value)}
                                        defaultValue={serviceName}
                                        margin="dense"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container className={classes.subtitle1}>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Bus Description:
                                </Grid>
                                <Grid item xs={8} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="busdesc" 
                                        variant="outlined"
                                        onChange={(e) => setServiceDesc(e.target.value)}
                                        defaultValue={serviceDesc}
                                        margin="dense"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={12} className={classes.title} style={{textAlign: 'left'}}>
                                Seat
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container >
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    First Class:
                                </Grid>
                                <Grid item xs={3} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="fqty" 
                                        variant="outlined"
                                        onChange={(e) => setFQty(e.target.value)}
                                        defaultValue={fQty}
                                        margin="dense"
                                        type="number"
                                        placeholder="Quantity"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                                <Grid item xs={5} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="fprice" 
                                        variant="outlined"
                                        onChange={(e) => setFPrice(e.target.value)}
                                        defaultValue={fPrice}
                                        margin="dense"
                                        type="number"
                                        placeholder="Price pet seat"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Business Class:
                                </Grid>
                                <Grid item xs={3} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="bqty" 
                                        variant="outlined"
                                        onChange={(e) => setBQty(e.target.value)}
                                        defaultValue={bQty}
                                        margin="dense"
                                        type="number"
                                        placeholder="Quantity"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                                <Grid item xs={5} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="bprice" 
                                        variant="outlined"
                                        onChange={(e) => setBPrice(e.target.value)}
                                        defaultValue={bPrice}
                                        margin="dense"
                                        type="number"
                                        placeholder="Price pet seat"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Economy Class:
                                </Grid>
                                <Grid item xs={3} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="eqty" 
                                        variant="outlined"
                                        onChange={(e) => setEQty(e.target.value)}
                                        defaultValue={eQty}
                                        margin="dense"
                                        type="number"
                                        placeholder="Quantity"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                                <Grid item xs={5} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="eprice" 
                                        variant="outlined"
                                        onChange={(e) => setEPrice(e.target.value)}
                                        defaultValue={ePrice}
                                        margin="dense"
                                        type="number"
                                        placeholder="Price pet seat"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} container>
                            <Grid item xs={12} className={classes.title} style={{textAlign: 'left'}}>
                                Service Infomation
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container >
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Departure Location:
                                </Grid>
                                <Grid item xs={8} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="depart" 
                                        variant="outlined"
                                        onChange={(e) => setDeparture(e.target.value)}
                                        defaultValue={departure}
                                        margin="dense"
                                        fullWidth
                                        required
                                        placeholder="Eg, TBS"
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Arrival Location:
                                </Grid>
                                <Grid item xs={8} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="arrival" 
                                        variant="outlined"
                                        onChange={(e) => setArrival(e.target.value)}
                                        defaultValue={arrival}
                                        margin="dense"
                                        fullWidth
                                        required
                                        placeholder="Eg, Sungai Nibung Terminal"
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={4} style={{paddingTop: 17, textAlign: 'left'}}>
                                    Departure Time:
                                </Grid>
                                <Grid item xs={8} style={{paddingRight: 10}}>
                                    <TextField 
                                        id="time" 
                                        variant="outlined"
                                        onChange={(e) => setTime(e.target.value)}
                                        defaultValue={time}
                                        margin="dense"
                                        fullWidth
                                        required
                                        type="time"
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container className={classes.subtitle} style={{marginTop: 10}}>
                                <Grid item xs={3} style={{paddingTop: 17, textAlign: 'left'}}>
                                    State:
                                </Grid>
                                <Grid item xs={4} style={{paddingRight: 10}}>
                                    <FormControl fullWidth>
                                        <Select
                                        id="from"
                                        value={locationFrom}
                                        onChange={handleChangeFrom}
                                        >
                                        {locations? (locations.map((lc) => {
                                            return(
                                                <MenuItem value={lc.locationID}>{lc.locationName}</MenuItem>
                                            )
                                        })) : null}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} style={{paddingRight:10, paddingTop: 20}}>
                                        To
                                </Grid>
                                <Grid item xs={4} style={{paddingRight: 10}}>
                                    <FormControl fullWidth>
                                        <Select
                                        id="to"
                                        value={locationTo}
                                        onChange={handleChangeTo}
                                        >
                                        {locations? (locations.map((lc) => {
                                            return(
                                                <MenuItem value={lc.locationID}>{lc.locationName}</MenuItem>
                                            )
                                        })) : null}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            
                        </Grid>
                        
                    </Grid>

                    <Grid item xs={12} container>
                            <Grid item xs={12} style={{textAlign: 'right', paddingRight: 20}}>
                                <Button 
                                    variant="outlined"
                                    startIcon={<AddIcon />} 
                                    style={{cursor: 'pointer', backgroundColor: 'red', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20}}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Box>
            {
                fillAll?<DialogNotFillAll />:null
            }
            </Container>
        </Container>
    )
}

export default AddService