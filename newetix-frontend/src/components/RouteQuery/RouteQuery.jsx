import {  Grid, Box,  Link, Typography, Autocomplete, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from 'react';
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { findRoute, viewCartData } from '../../state/actions/actions';
import Query from './Query';
import {getLocationName} from '../globalAssets/scripts/getLocationName';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { CircularProgress } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addToCart } from '../../state/actions/actions';
import { CART_ADD_RESET, FILTER_ROUTE_RESET, ROUTE_RESET, SEARCH_LOCATION_RESET } from '../../state/actions/actionConstants';
import { filterRoute } from '../../state/actions/actions';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Backdrop from '@mui/material/Backdrop';

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

export default function RouteQuery() {
    let history = useHistory()

    const dispatch = useDispatch();

    const classes = useStyles()
    const [i, seti] = useState(0);
    const routeLookup = useSelector(state => state.routeLookup)
    const {route, loading: loadingRoute, error: routeError} = routeLookup

    const locationList = useSelector(state => state.locationList)
    const {locations} = locationList

    const cartAdd = useSelector(state => state.cartAdd)
    const {loading: addLoading, success: addSuccess} = cartAdd

    const routeFilter = useSelector(state => state.routeFilter)
    const {loading: filterLoading, success: filterSuccess, route: filteredRoute} = routeFilter

    const locationSearch = useSelector(state => state.locationSearch)
    const {loading: locationLoading, data} = locationSearch

    const {fromm, too, datee} = useParams();

    const [to, setTo] = useState(too);
    const [from, setFrom] = useState(fromm);
    const [departureDate, setDepartureDate] = useState(null)
    const [priceFlt, setPriceFlt] = useState("")
    const [selectedSeat, setSelectedSeat] = useState("")
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [terminalFilter, setTerminalFilter] = useState("")

    const [serviceList, setServiceList] = useState()
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedItem,setSelectedItem] = useState();
    const [filteredList, setFilteredList] = useState(null);

    const [latTo, setLatTo] = useState(0);
    const [longTo, setLongTo] = useState(0);
    const [latF, setLatF] = useState(0);
    const [longF, setLongF] = useState(0);
    
    const handleFromInputChange = (event, value) =>  {
        setFrom(value);
    }

    useEffect(() => {
        if(data){
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
                params: {q: locationSearch.data.locationFrom, 'accept-language': 'en', polygon_threshold: '0.0'},
                headers: {
                    'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
                    'x-rapidapi-key': 'c0b1414666msh7239510d4240d30p1b7581jsn27d673214b95'
                }
            };

            axios.request(options).then(function (response) {
                setLatF(response.data[0].lat);
                setLongF(response.data[0].lon);
                console.log(latF);
                console.log(longF);
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, [locationSearch, data])

    useEffect(() => {
        if(data){
            var axios = require("axios").default;

            var options = {
                method: 'GET',
                url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
                params: {q: locationSearch.data.locationTo, 'accept-language': 'en', polygon_threshold: '0.0'},
                headers: {
                    'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
                    'x-rapidapi-key': 'c0b1414666msh7239510d4240d30p1b7581jsn27d673214b95'
                }
            };

            axios.request(options).then(function (response) {
                setLatTo(response.data[0].lat);
                setLongTo(response.data[0].lon);
                console.log(latTo);
                console.log(longTo);
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, [locationSearch, data])

    
    useEffect(() => {
        if(i === 0 && route.length===0){
            dispatch(getLocations())
            dispatch(vendorList())
            dispatch(getAllRoutes())
            dispatch(findRoute(fromm, too, datee));
            seti(1);
        }

        if(route.length!==0){
            setServiceList(route)
            setFilteredList(route)
        }
    }, [routeLookup])

    useEffect(() => {
        if(data){
            console.log(locationSearch);
            setFrom(data.locationFrom)
            setTo(data.locationTo)
            setDepartureDate(data.departureDate)
        } 
    }, [locationSearch])

    useEffect(() => {
        if(filteredRoute.length!==0){
            setFilteredList(filteredRoute);
        }
        else{
            setFilteredList(filteredRoute);
        }
    }, [routeFilter])

    const handleFilter = () => {
        if(priceFlt || minPrice || maxPrice || terminalFilter){
            dispatch(filterRoute(serviceList, priceFlt, minPrice, maxPrice, terminalFilter));
        }            
    }

    const handleClearFilter = () => {
        setFilteredList(null)
        setMinPrice()
        setMaxPrice()
        setPriceFlt("")
        setTerminalFilter("")

        dispatch(filterRoute(serviceList))
    }   

    async function process(from, to){
        dispatch(findRoute(from, to, departureDate))
        dispatch({type: FILTER_ROUTE_RESET})
        setFilteredList(null)
        setMinPrice()
        setMaxPrice()
        setPriceFlt("")
        setTerminalFilter("")
        history.push(`/routes/${from}/${to}/${departureDate}`)
    }

    function handleSubmit(e) {
      e.preventDefault();
      console.log(from, to)
      if(!to){
        alert("Please pick a location of arrival");
        return;
      }

      if(!from){
        alert("Please pick a location of departure");
        return;
      }


      if(departureDate === null){
        alert("Please pick a date of departure");
        return;
      }
      process(from, to)
    }

    const handleToInputChange = (event, value) => {
        setTo(value)
    }

    useEffect(() => {
        if(addSuccess){
            setOpenDialog(false);
            setSelectedItem(null);
            setSelectedSeat("");
            alert(`added to cart Successfully`);
            dispatch({type: CART_ADD_RESET})
            history.push('/cart')
        }
    }, [addSuccess])


    const handleAddToCart = (item) => {
        dispatch(addToCart(item, selectedSeat, selectedSeat === "F" ? item.seatD.firstPrice : (selectedSeat === "B" ? item.seatD.businessPrice : item.seatD.economyPrice)))
    }

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedItem(null);
    };

    const handleOpenDialog = (item) => {
        setOpenDialog(true);
        setSelectedItem(item);
    }
    
    const handleBack = () => {
        dispatch({type: SEARCH_LOCATION_RESET});
        dispatch({type: ROUTE_RESET});
        dispatch({type: FILTER_ROUTE_RESET});
        history.push('/');
    }

    

    const handleTerminalFilter = (e) => {
        setTerminalFilter(e.target.value)
    }

    const findMinPrice = (economy, business, first) => {
        
        let min = 0;
        if(Number(economy) !== 0){
            min = Number(economy).toFixed(2);
        }
        else if(Number(business) !== 0){
            min = Number(business).toFixed(2);
        }
        else if(Number(first) !== 0){
            min = Number(first).toFixed(2);
        }
        else {
            return 0.00;
        }
        



        if(min > business && Number(business) !== 0  ){
            min = business;
        }

        if(min > first && Number(first) !== 0 ){
            min = first;
        }

        return min;
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;

  return (
      <Container className={classes.whole} maxWidth="Fixed">
          <Container>
          <Grid  container spacing={3} direction="column">
              {locationLoading || route.length ===0?
              (
                  null
              )
              :
              (
                <>
                  <Grid item xs={12} container style={{marginTop: 20}}>
                        <Grid item xs={3} container >
                            <Autocomplete
                                id="fromCombobox"
                                options={locations}
                                defaultValue={{ locationName: from }}
                                getOptionLabel={(option) => option.locationName}
                                style={{width:300}}
                                onInputChange={handleFromInputChange}
                                renderInput={params => (
                                <TextField {...params} variant="outlined" style={{backgroundColor: 'white'}} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={1} style={{textAlign: 'center', margin: 'auto', fontWeight: 'bold'}}>
                            To
                        </Grid>
                        <Grid item xs={3} container>
                            <Autocomplete
                                id="toCombobox"
                                options={locations}
                                defaultValue={{ locationName: to }}
                                getOptionLabel={(option) => option.locationName}
                                style={{width:300}}
                                onInputChange={handleToInputChange}
                                renderInput={params => (
                                <TextField {...params} variant="outlined" style={{backgroundColor: 'white'}} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3} container>
                            <Grid item xs={1} />
                            <TextField 
                            id="departD" 
                            variant="outlined"
                            onChange={(e) => setDepartureDate(e.target.value)}
                            value={departureDate}
                            margin="dense"
                            type="date"
                            required
                            size="small"
                            inputProps={{
                                min: todayDate,
                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: 'white'}                        
                            }}                                             
                          /> 
                        </Grid>
                        <Grid item xs={2} container>
                          <Grid item xs={12} style={{margin:'auto'}}>
                            <Button variant="contained" onClick={handleSubmit} ><SearchIcon></SearchIcon> Search</Button>
                          </Grid>
                        
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={4} container style={{backgroundColor: "grey", minHeight: 50, padding: 20}}>
                            <Grid item xs={12} style={{backgroundColor: "green", maxHeight: "Fixed", maxWidth: "Fixed"}}>
                                <iframe width="345" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                src={"https://www.openstreetmap.org/export/embed.html?bbox="+longF+"%2C"+latF+"%2C"+longTo+"%2C"+latTo+"&amp;layer=mapnik"}
                                ></iframe>
                            </Grid>
                        </Grid>
                        <Grid item xs={8} container style={{backgroundColor: 'grey', minHeight: 50, padding: 20}}>
                                    <Grid item xs={4} container style={{backgroundColor: 'green', padding: 10, fontFamily: ['rubik', 'sans-serif'].join(','),}}>
                                        <Grid item xs={12} style={{fontWeight: 'bold', textDecorationLine: 'underline',}}>
                                            By Price
                                        </Grid>
                                        <Grid item xs={12} >
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="controlled-radio-buttons-group"
                                                    value={priceFlt}
                                                    onChange={(e) => setPriceFlt(e.target.value)}
                                                >
                                                    <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                                                    <FormControlLabel value="dsc" control={<Radio />} label="Descending" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} container>
                                            <Grid item xs={5}>
                                                <TextField 
                                                    id="minPrice" 
                                                    variant="outlined"
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                    value={minPrice}
                                                    placeholder="Min"
                                                    margin="dense"
                                                    type="number"
                                                    required
                                                    size="small"
                                                    InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: 'white'}                        
                                                    }}                                             
                                                />
                                            </Grid>
                                            <Grid item xs={2} style={{textAlign : 'center', margin: 'auto'}}>
                                                -
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField 
                                                    id="maxPrice" 
                                                    variant="outlined"
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                    placeholder="Max"
                                                    value={maxPrice}
                                                    margin="dense"
                                                    type="number"
                                                    required
                                                    size="small"
                                                    InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: 'white'}                        
                                                    }}                                             
                                                />
                                            </Grid>
                                             
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} container style={{backgroundColor: 'green', padding: 10, fontFamily: ['rubik', 'sans-serif'].join(','),}}>
                                        <Grid item xs={12} style={{fontWeight: 'bold', textDecorationLine: 'underline',}}>
                                            By Terminal
                                        </Grid>
                                        <Grid item xs={12} >
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="terminal"
                                                    name="controlled-radio-buttons-group"
                                                    value={terminalFilter}
                                                    onChange={handleTerminalFilter}
                                                >
                                                    {serviceList?
                                                        (
                                                            serviceList.map((item) => {
                                                                return(
                                                                    <FormControlLabel value={`${item.servicedepartureTerminal} - ${item.servicearrivalTerminal}`} control={<Radio />} label={`${item.servicedepartureTerminal} - ${item.servicearrivalTerminal}`} />
                                                                )
                                                            })
                                                        )
                                                        :
                                                        (
                                                            null
                                                        )
                                                    }
                                                    
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                    </Grid>
                                    <Grid item xs={4} container style={{backgroundColor: 'green'}}>
                                    
                                    </Grid>
                                    <Grid item xs={12} container style={{textAlign: 'right', paddingTop: 10}}>
                                        <Grid item xs={8} />
                                        <Grid item xs={2}>
                                            <Button variant="contained" onClick={handleClearFilter}><HighlightOffIcon />Clear</Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button variant="contained" onClick={handleFilter}><FilterAltIcon />Filter</Button>
                                        </Grid>
                                    </Grid>
                        </Grid>
                    </Grid>
                </>
              )}
              

                    <Grid item xs={12} container >
                        {
                            loadingRoute || filterLoading?
                            (
                                <Box sx={{ display: 'flex' }}>
                                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                                <CircularProgress  style={{color: '#F5CB5C'}}/>    
                                </Backdrop>
                                </Box>
                            )
                            :
                            (
                                filteredList?
                                (
                                    filteredList.length === 0?
                                    (
                                        <>
                                            <Grid item xs={12} container>
                                                <Tooltip title="Back">
                                                    <IconButton onClick={handleBack}>
                                                        <ArrowBackIcon fontSize="large" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                            <Alert variant="filled" severity="error" sx={{width: '100%'}} style={{marginTop: 20 }}>
                                                No Service Available. . .
                                            </Alert>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                        {
                                        filteredList.map((item, index) => {
                                            return (
                                                <Grid item xs={12} container style={{background: 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))', margin: 10}}>
                                                    <Grid item xs={3}>
                                                        <img 
                                                            src={`https://etixbucket.s3.amazonaws.com/etix/${item.serviceID}.png`}
                                                            alt={`serviceLogo${item.vendor}`}
                                                            style={{margin: 10, maxHeight: 170, maxWidth:250,}}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={9} container style={{color: 'white', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                        <Grid item xs={12} >
                                                            <Typography style={{fontSize: 30}}>
                                                                {`${item.servicedepartureTerminal} (${item.searchedFrom}) - ${item.servicearrivalTerminal} (${item.searchedTo})`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} container>
                                                            <Grid item xs={8} style={{paddingLeft: 20}}>
                                                                {item.seatD.firstQuantity>0 && Number(item.seatD.firstPrice) != 0.00?
                                                                    (
                                                                        <Typography style={{fontSize: 20, fontStyle: 'italic'}}>
                                                                            {`First Class : RM ${item.seatD.firstPrice}`}
                                                                        </Typography>
                                                                    )
                                                                    : 
                                                                    (
                                                                        null
                                                                    )
                                                                }
                                                                {item.seatD.businessQuantity>0 && Number(item.seatD.businessPrice) !==0?
                                                                    (
                                                                        <Typography style={{fontSize: 20 , fontStyle: 'italic'}}>
                                                                            {`Business Class : RM ${item.seatD.businessPrice}`}
                                                                        </Typography>
                                                                    )
                                                                    : 
                                                                    null
                                                                }
                                                                {item.seatD.economyQuantity>0 && Number(item.seatD.economyPrice) !==0?
                                                                    (
                                                                        <Typography style={{fontSize: 20, fontStyle: 'italic'}}>
                                                                            {`Economy Class : RM ${item.seatD.economyPrice}`}
                                                                        </Typography>
                                                                    )
                                                                    : 
                                                                    null
                                                                }
                                                            </Grid>
                                                            <Grid item xs={4} style={{textAlign: 'right'}} >
                                                                Start From: RM
                                                                <Typography style={{fontSize: 40}} >
                                                                    {
                                                                        findMinPrice(item.seatD.economyPrice, item.seatD.businessPrice, item.seatD.firstPrice)
                                                                    }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} container>
                                                            <Grid item xs={12}  container>
                                                                <Grid item xs={8}>
                                                                    <Typography style={{fontSize: 20}}>
                                                                        {`Depart Time : ${item.serviceTime}`}
                                                                    </Typography>
                                                                </Grid> 
                                                                <Grid item xs={4} style={{textAlign: 'right'}}>
                                                                    <Tooltip title="Add to Cart">
                                                                        <IconButton  onClick={() => handleOpenDialog(item)} >
                                                                            <AddShoppingCartIcon style={{fontSize: 28, color: 'white'}}/>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    {selectedItem?
                                                                        (
                                                                            <Dialog
                                                                                open={openDialog}
                                                                                onClose={handleClose}
                                                                                aria-labelledby="draggable-dialog-title"
                                                                            >
                                                                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                                                Add to Cart
                                                                                </DialogTitle>
                                                                                    <DialogContent>
                                                                                        <DialogContentText>
                                                                                            Please Choose Seat Type You Want.
                                                                                        </DialogContentText>
                                                                                        <FormControl component="fieldset">
                                                                                            <RadioGroup
                                                                                                aria-label="stype"
                                                                                                name="controlled-radio-buttons-group"
                                                                                                value={selectedSeat}
                                                                                                onChange={(e) => setSelectedSeat(e.target.value)}
                                                                                            >
                                                                                                {Number(selectedItem.seatD.firstPrice)!== 0.00 && Number(selectedItem.seatD.firstQuantity)!==0?
                                                                                                    (
                                                                                                        <FormControlLabel value="F" control={<Radio />} label={`First Class - RM ${selectedItem.seatD.firstPrice}`} />
                                                                                                    )
                                                                                                    :
                                                                                                    (
                                                                                                        null
                                                                                                    )
                                                                                                }
                                                                                                {selectedItem.seatD.businessPrice!==0 && Number(selectedItem.seatD.businessQuantity)!==0 ?
                                                                                                    (
                                                                                                        <FormControlLabel value="B" control={<Radio />} label={`Business Class - RM ${selectedItem.seatD.businessPrice}`} />
                                                                                                    )
                                                                                                    :
                                                                                                    (
                                                                                                        null
                                                                                                    )
                                                                                                }
                                                                                                 {selectedItem.seatD.economy !== 0 && Number(selectedItem.seatD.economyQuantity)!==0?
                                                                                                    (
                                                                                                        <FormControlLabel value="E" control={<Radio />} label={`Economy Class - RM ${selectedItem.seatD.economyPrice}`} />
                                                                                                    )
                                                                                                    :
                                                                                                    (
                                                                                                        null
                                                                                                    )
                                                                                                }
                                                                                            </RadioGroup>
                                                                                        </FormControl>
                                                                                    </DialogContent>
                                                                                <DialogActions>
                                                                                <Button autoFocus onClick={handleClose}>
                                                                                    Cancel
                                                                                </Button>
                                                                                <Button onClick={() => handleAddToCart(selectedItem)}>Add</Button>
                                                                                </DialogActions>
                                                                            </Dialog>
                                                                        )
                                                                        :
                                                                        (
                                                                            null
                                                                        )
                                                                    }
                                                                    
                                                                    
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                        </>
                                    )
                                    
                                    
                                )
                                :
                                (
                                    <Box sx={{ display: 'flex' }}>
                                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                                    <CircularProgress  style={{color: '#F5CB5C'}}/>    
                                    </Backdrop>
                                    </Box>
                                )
                                
                            )
                        }
                        {
                        addLoading?
                        <Box sx={{ display: 'flex' }}>
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                        <CircularProgress  style={{color: '#F5CB5C'}}/>    
                        </Backdrop>
                        </Box>
                        :
                        null
                        }
                    </Grid>
                </Grid>
          </Container>
      </Container>
  );

}