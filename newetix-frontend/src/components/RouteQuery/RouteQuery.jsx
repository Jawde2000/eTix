import {  Grid, Box,  Link, Typography, Autocomplete, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from 'react';
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { routeLookup } from '../../state/actions/actions';
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
import { CART_ADD_RESET } from '../../state/actions/actionConstants';

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

    const routeLookup = useSelector(state => state.routeLookup)
    const {route, loading: loadingRoute} = routeLookup

    const locationList = useSelector(state => state.locationList)
    const {locations} = locationList

    const cartAdd = useSelector(state => state.cartAdd)
    const {loading: addLoading, success: addSuccess} = cartAdd

    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [departureDate, setDepartureDate] = useState(null)
    const [filter, setFilter] = useState(false)
    const [priceFlt, setPriceFlt] = useState("")
    const [selectedSeat, setSelectedSeat] = useState("")

    const [serviceList, setServiceList] = useState()
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedItem,setSelectedItem] = useState()
    const [selectedSeatPrice, setSelectedSeatPrice] = useState();

    const handleFromInputChange = (event, value) =>  {
        setFrom(value);
    }

    useEffect(() => {
        if(route){
            setServiceList(route)
            setFrom(route[0]? route[0].searchedFrom : null)
            setTo(route[0]? route[0].searchedTo: null)
            setDepartureDate(route[0]? route[0].serviceStartDate : null)
        }
    }, [routeLookup])

    // useEffect(() => {
    //     if(serviceList){
    //         serviceList.sort((a,b) => (a.seatD.economyPrice > b.seatD.economyPrice) ? 1 : ((b.seatD.economyPrice > a.seatD.economyPrice) ? -1 : 0));
    //         console.log(serviceList)          
    //     }
        
    // }, [serviceList])

    useEffect(() => {
        if(serviceList){
            if(priceFlt === "asc"){
                serviceList.sort((a,b) => (a.seatD.economyPrice > b.seatD.economyPrice) ? 1 : ((b.seatD.economyPrice > a.seatD.economyPrice) ? -1 : 0));
                console.log(serviceList)
            }
            else if(priceFlt === 'dsc'){
                serviceList.sort((a,b) => (a.seatD.economyPrice < b.seatD.economyPrice) ? 1 : ((b.seatD.economyPrice < a.seatD.economyPrice) ? -1 : 0));
                console.log(serviceList)
            }
        }
        
    }, [priceFlt])

    async function process(from, to){
        dispatch(routeLookup(from, to, departureDate))
    }
    function handleSubmit(e) {
      e.preventDefault();
      if(departureDate === null){
        alert("Please pick a date of departure");
        return;
      }
      process(from, to)
      history.push('/routes')
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

  return (
      <Container className={classes.whole} maxWidth="Fixed">
          <Container>
              <Grid  container spacing={3} direction="column">
                  <Grid item xs={12} container style={{marginTop: 20}}>
                        <Grid item xs={3} container>
                            <Autocomplete
                                id="fromCombobox"
                                options={locations}
                                getOptionLabel={(option) => option.locationName}
                                style={{width:300}}
                                onInputChange={handleFromInputChange}
                                renderInput={params => (
                                <TextField {...params} label={from} variant="outlined" style={{backgroundColor: 'white'}} />
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
                                getOptionLabel={(option) => option.locationName}
                                style={{width:300}}
                                onInputChange={handleToInputChange}
                                renderInput={params => (
                                <TextField {...params} label={to} variant="outlined" style={{backgroundColor: 'white'}} />
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
                            InputProps={{
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
                        <Grid item xs={12}>
                            <Tooltip title="Filter Search">
                                <IconButton  onClick={() => setFilter(!filter)} style={{color: 'blue'}}>
                                    <FilterAltIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        {filter?
                            (
                                <Grid item xs={12} container style={{backgroundColor: 'grey', minHeight: 50, padding: 20}}>
                                    {/* filter by price */}
                                    <Grid item xs={4} container>
                                        <Grid item xs={12} style={{fontWeight: 'bold', textDecorationLine: 'underline',}}>
                                            By Price
                                        </Grid>
                                        <Grid item xs={12} style={{fontFamily: ['rubik', 'sans-serif'].join(','), paddingTop: 10}}>
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
                                    </Grid>
                                </Grid>
                            )
                            :
                            (null)
                        }

                    </Grid>

                    <Grid item xs={12} container >
                        {
                            loadingRoute?
                            (
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                            )
                            :
                            (
                                serviceList?
                                (
                                    serviceList.map((item, index) => {
                                        return (
                                            <Grid item xs={12} container style={{background: 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))', margin: 10}}>
                                                <Grid item xs={3}>
                                                    <img 
                                                        src="https://i.pinimg.com/originals/16/53/70/1653702ba566a449348ef2c3010259ce.jpg"
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
                                                            {item.seatD.firstQuantity>0?
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
                                                            {item.seatD.businessQuantity>0?
                                                                (
                                                                    <Typography style={{fontSize: 20 , fontStyle: 'italic'}}>
                                                                        {`Business Class : RM ${item.seatD.businessPrice}`}
                                                                    </Typography>
                                                                )
                                                                : 
                                                                null
                                                            }
                                                            {item.seatD.economyQuantity>0?
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
                                                                {`${item.seatD.economyPrice}`}
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
                                                                                            <FormControlLabel value="F" control={<Radio />} label={`First Class - RM ${selectedItem.seatD.firstPrice}`} />
                                                                                            <FormControlLabel value="B" control={<Radio />} label={`Business Class - RM ${selectedItem.seatD.businessPrice}`} />
                                                                                            <FormControlLabel value="E" control={<Radio />} label={`Economy Class - RM ${selectedItem.seatD.economyPrice}`} />
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
                                    })
                                )
                                :
                                (
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>
                                )
                                
                            )
                        }
                    </Grid>
                </Grid>
          </Container>
      </Container>
  );

}