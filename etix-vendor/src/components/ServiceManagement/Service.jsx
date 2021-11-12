import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, TextField, Button, Toolbar} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import "../Font/fonts.css"
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceDetail, deleteService, saveService } from '../../actions/serviceActions/serviceActions';
import { SERVICE_DELETE_RESET, SERVICE_DETAIL_RESET , SERVICE_SAVE_RESET} from '../../constants/serviceConstants/serviceConstants';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import S3 from 'react-aws-s3';
import Avatar from '@mui/material/Avatar';
import moscow from '../globalAssets/moscow.jpg';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';

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

    const file = id + '.jpg'

    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);

    const config = {
        bucketName: 'etixbucket',
        dirName: 'services', 
        region: 'ap-southeast-1',
        accessKeyId: 'AKIA4TYMPNP6EQNIB7HV',
        secretAccessKey: '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'
    }
    
    const AWS = require('aws-sdk')

    AWS.config.update({
        accessKeyId: "AKIA4TYMPNP6EQNIB7HV",
        secretAccessKey: "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",
        region: "ap-southeast-1",
    });
    
    const ReactS3Client = new S3(config);

    async function PicExist() {
        const url = "https://etixbucket.s3.amazonaws.com/services/" + file
        await fetch(url).then((res) => {
            if (res.status == 404) {
                setFound(false)
                console.log("found")
            } 
            else {
                console.log("found")
                setFound(true)
            }
        }).catch((err) => {
            setFound(false)
        });
    }
        
    useEffect(async () => {
        PicExist()
    })

    const upload = (e) => {
        const image = URL.createObjectURL(e.target.files[0]);
        setPloading(true);
        setImgSrc(image);
        ReactS3Client.uploadFile(e.target.files[0], file)
        .then(data =>{
            setPloading(false);
            // window.setTimeout(function(){window.location.reload()},3000)
            console.log(data);
        })
        .catch(err => {
            console.error(err)
            setPloading(false);
        })
    }

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    let history = useHistory()

    const serviceDetail = useSelector(state => state.serviceDetail)
    const {serviceD} = serviceDetail

    const serviceSave = useSelector(state => state.serviceSave)
    const {success: successSave} = serviceSave

    const serviceDelete = useSelector(state => state.serviceDelete)
    const {success: successDelete} = serviceDelete

    const [imgSrc, setImgSrc] = useState(("https://etixbucket.s3.amazonaws.com/services/" + file));
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

    const [service, setService] = useState()
    const [seat, setSeat] = useState()
    const [locationFrom, setLocationFrom] = useState()
    const [locationTO, setLocationTO] = useState()

    useEffect(() => {
        if(successSave ){
            alert("Saved successfully!");
            dispatch({type: SERVICE_SAVE_RESET});
            dispatch({type: SERVICE_DETAIL_RESET});
            setEditing(false);
            history.push(`/menu/servicemanagement/${id}`);
        }
        
    }, [successSave])

    const handleSave = () => {
        let lF = route.split("-")

        setLocationFrom(lF[0])
        setLocationTO(lF[1])



        setService({
            serviceName: serviceName,
            serviceDesc: serviceDesc,
            serviceStatus: status,
            serviceTime: time,
            serviceStartDate: startDate,
            serviceEndDate: endDate,
            servicedepartureTerminal: departure,
            servicearrivalTerminal: arrival,
            serviceFrequency: serviceD.serviceFrequency,
        })

        setSeat({
            firstQuantity: firstQty,
            businessQuantity: businessQty,
            economyQuantity: economyQty,
            firstPrice: firstPrice,
            businessPrice: businessPrice,
            economyPrice: economyPrice,
        })

        
    }

    useEffect(() => {
        if(service && seat){
            dispatch(saveService(id, serviceD.seat, serviceD.locationFrom, serviceD.locationTo, service, seat, locationFrom, locationTO ))
        }
    }, [service, seat])

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
        }
    }, [serviceD,id])

    const [editing, setEditing] = useState(false);
    
    // function to change service status, remember to update backend afterwards
    const changeStatus = () => {
       if(status==="O"){
           setStatus("X")
       }
       else{
           setStatus("O")
       }
    };

    useEffect(() => {
        if(successDelete){
            dispatch({type: SERVICE_DELETE_RESET})
            dispatch({type: SERVICE_DETAIL_RESET});
            history.push("/menu/servicemanagement");
        }
    }, [serviceDelete])

    const handleBack = () => {
        dispatch({type: SERVICE_DETAIL_RESET});
        history.push("/menu/servicemanagement");
    }

    const handleChangefPrice = (event) => {
        setFirstPrice(event.target.value)
    }
    
    const handleChangebPrice = (event) => {
        setBusinessPrice(event.target.value)
    }
    
    const handleChangeePrice = (event) => {
        setEconomyPrice(event.target.value)
    }

    const handleChangeFQty = (event) => {
        setFirstQty(event.target.value)
    }
    
    const handleChangeBQty = (event) => {
        setBusinessQty(event.target.value)
    }
    
    const handleChangeEQty = (event) => {
        setEconomyQty(event.target.value)
    }

    const handleChangeDepart = (event) =>{
        setDeparture(event.target.value)
    }

    const handleChangeArrival = (event) => {
        setArrival(event.target.value)
    }

    const handleChangeRoute = (event) => {
        setRoute(event.target.value)
        //need to seperate the route 
    }

    const handleChangeSName = (event) => {
        setServiceName(event.target.value)
    }

    const handleChangeDesc = (event) => {
        setServiceDesc(event.target.value)
    }

    const handleChangeStart = (event) => {
        setStartDate(event.target.value)
    }

    const handleChangeEnd = (event) => {
        setEndDate(event.target.value)
    }

    const handleChangeTime = (event) => {
        setTime(event.target.value)
    }

    const DialogDelete = () => {
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
        const handleDelete = () => {
            dispatch(deleteService(id));
            handleClose();
        }

        return (
          <Toolbar>
            <Tooltip title="Delete" onClick={handleClickOpen}>
                <DeleteIcon fontSize="large" style={{color: "black"}}/>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Service(s)"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete the service(s)?
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
                        {!editing?
                            (
                                <Tooltip title="Edit Service">
                                    <IconButton onClick={() => setEditing(!editing)}>
                                        <EditIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            )
                            :
                            (
                                <Tooltip title="Save">
                                    <IconButton >
                                        <SaveIcon className={classes.functionicon} fontSize="large" onClick={handleSave}/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        
                        <IconButton>
                            <DialogDelete className={classes.functionicon} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%'}} className={classes.box}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12} container>
                        <Grid item xs={12} sm={5} container textAlign="center">
                            <Grid item xs={12} >
                                Service Profile
                            </Grid>
                            <Grid item xs={12} spacing={5} style={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:10}} direction="column">
                            <Grid>
                            <Avatar
                                style={{ height: '150px', width: '150px' }}
                                src={imgSrc}
                                alt={serviceD? serviceD.servicedepartureTerminal:'No Picture Found'}        
                            />
                            </Grid>
                            <Grid>
                            {!editing? "":(
                                <div>
                                <label htmlFor="contained-button-file">
                                <input type="file"  accept="image/*" id="contained-button-file" onChange={upload}
                                style={{justifyContent:'center', alignItems:'center', display: 'none'}}
                                />
                                {picloading? (<Box sx={{ display: 'flex' }}
                                style={{justifyContent:'center', alignItems:'center'}}
                                ><CircularProgress /></Box>):(<Button variant="contained" component="span" >Upload</Button>)}
                                </label>                            
                                </div>
                            )}
                            </Grid>
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
                            
                            <Grid item xs={12} sm={12} className={classes.subtitle} style={{fontWeight: "bold"}}>
                                Seat Price
                            </Grid>
                            {!editing?
                                (
                                    <>
                                    <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                        <Grid item xs={5} style={{textAlign: 'right'}}>
                                            First Class: 
                                        </Grid>
                                        <Grid item xs={1} />
                                        <Grid item xs={6} style={{textAlign: 'left'}}>
                                            MYR {firstPrice}                   
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                        <Grid item xs={5} style={{textAlign: 'right'}}>
                                            Business Class: 
                                        </Grid>
                                        <Grid item xs={1} />
                                        <Grid item xs={6} style={{textAlign: 'left'}}>
                                            MYR {businessPrice}                   
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                        <Grid item xs={5} style={{textAlign: 'right'}}>
                                            Economy: 
                                        </Grid>
                                        <Grid item xs={1} />
                                        <Grid item xs={6} style={{textAlign: 'left'}}>
                                            MYR {economyPrice}                   
                                        </Grid>
                                    </Grid>
                                    </>
                                )
                                :
                                (
                                    <>
                                    <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                        <Grid item xs={5} style={{textAlign: 'right'}}>
                                            First Class: 
                                        </Grid>
                                        <Grid item xs={1} />
                                        <Grid item xs={6} style={{textAlign: 'left'}}>
                                            <TextField 
                                                    id="fPrice" 
                                                    variant="outlined"
                                                    value={firstPrice}
                                                    type="number"
                                                    step="0.01"
                                                    onChange={handleChangefPrice}
                                                    size="small"
                                                    InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 100}
                                                }} 
                                            />                   
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                        <Grid item xs={5} style={{textAlign: 'right'}}>
                                            Business Class: 
                                        </Grid>
                                        <Grid item xs={1} />
                                        <Grid item xs={6} style={{textAlign: 'left'}}>
                                            <TextField 
                                                    id="bPrice" 
                                                    variant="outlined"
                                                    value={businessPrice}
                                                    type="number"
                                                    step="0.01"
                                                    size="small"
                                                    onChange={handleChangebPrice}
                                                    InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 100}
                                                }} 
                                            />                   
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} className={classes.subtitle} style={{paddingLeft: 50}} container>
                                        <Grid item xs={5} style={{textAlign: 'right'}}>
                                            Economy: 
                                        </Grid>
                                        <Grid item xs={1} />
                                        <Grid item xs={6} style={{textAlign: 'left'}}>
                                            <TextField 
                                                    id="ePrice" 
                                                    variant="outlined"
                                                    value={economyPrice}
                                                    type="number"
                                                    step="0.01"
                                                    size="small"
                                                    onChange={handleChangeePrice}
                                                    InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 100}
                                                }} 
                                            />                   
                                        </Grid>
                                    </Grid>
                                    </>
                                )
                            }
                            {!editing?
                                null
                                :
                                (
                                    <>
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
                                                        onChange={handleChangeDepart}
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
                                                        onChange={handleChangeArrival}
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
                                                        onChange={handleChangeRoute}
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
                                                        onChange={handleChangeSName}
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
                                                        onChange={handleChangeDesc}
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
                                                            onChange={handleChangeFQty}
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
                                                            onChange={handleChangeBQty}
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
                                                            onChange={handleChangeEQty}
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
                                                        onChange={handleChangeStart}
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
                                                        onChange={handleChangeEnd}
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
                                                        onChange={handleChangeTime}
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
