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

    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [departureDate, setDepartureDate] = useState(null)
    const [filter, setFilter] = useState(false)
    const [priceFlt, setPriceFlt] = useState("")

    const [serviceList, setServiceList] = useState()

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
                                    serviceList.map((item) => {
                                        return (
                                            <Grid item xs={12} container style={{background: 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))', margin: 10}}>
                                                <Grid item xs={3}>
                                                    <img 
                                                        src="https://i.pinimg.com/originals/16/53/70/1653702ba566a449348ef2c3010259ce.jpg"
                                                        alt={`serviceLogo${item.vendor}`}
                                                        style={{margin: 10, maxHeight: 170, maxWidth:250, minWidth: 250}}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} container style={{color: 'white', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                    <Grid item xs={12} >
                                                        <Typography style={{fontSize: 30}}>
                                                            {`${item.servicedepartureTerminal} - ${item.servicearrivalTerminal}`}
                                                        </Typography>

                                                    </Grid>
                                                    <Grid item xs={12} container>
                                                        <Grid item xs={12} />
                                                        <Grid item xs={12} />
                                                        <Grid item xs={12} />
                                                        <Grid item xs={12}  container>
                                                            <Grid item xs={8}>
                                                                <Typography style={{fontSize: 20}}>
                                                                    {`Depart Time : ${item.serviceTime}`}
                                                                </Typography>
                                                            </Grid> 
                                                            <Grid item xs={4} style={{textAlign: 'right'}}>
                                                                <Tooltip title="Add to Cart">
                                                                    <IconButton  onClick={() => alert("Add to cart lol")} >
                                                                        <AddShoppingCartIcon style={{fontSize: 28, color: 'white'}}/>
                                                                    </IconButton>
                                                                </Tooltip>
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
    //   <div>
    //     <Grid container className={defaultStyle.whole}>
    //       <Grid xs={12} spacing={4} direction="column" container justify="center" alignItems="center" alignContent="center">
    //         <Grid xs={12} sm={2} item>
    //             <Grid container justifyContent="space-between" direction="row" className={defaultStyle.breadcrumbgrid}>
    //                 <Breadcrumbs aria-label="breadcrumb" className={defaultStyle.breadcrumb}>
    //                     <Typography>
    //                         eTix Route Search
    //                     </Typography>
    //                     <Typography id='from' onClick={handleClickOpen}>
    //                         {from} ({departureDate})
    //                     </Typography>
    //                     <Typography id='to' onClick={handleClickOpen}>
    //                         {to} ({returnDate})
    //                     </Typography>
    //                 </Breadcrumbs>
    //                 <Dialog open={open} onClose={handleClose}>
    //                     <DialogTitle>Change Location and Date</DialogTitle>
    //                     <DialogContent>
    //                         <Autocomplete
    //                             disablePortal
    //                             value={loc}
    //                             onChange={(event, newValue) => {
    //                             setLocation(newValue);
    //                             }}
    //                             id="locCombobox"
    //                             className={defaultStyle.ac}
    //                             options={Locations}
    //                             sx={{ width: 300 }}
    //                             renderInput={(params) => <TextField {...params} label="Location" />}
    //                         />
    //                         <LocalizationProvider dateAdapter={AdapterDateFns}>
    //                             <DatePicker
    //                                 label="Date"
    //                                 value={value}
    //                                 onChange={(newValue) => {
    //                                 setValue(newValue);
    //                                 }}
    //                                 renderInput={(params) => <TextField {...params} />}
    //                             />
    //                         </LocalizationProvider>
    //                     </DialogContent>
    //                     <DialogActions>
    //                     <Button onClick={handleClose}>Cancel</Button>
    //                     <Button onClick={handleLocationChange}>Change</Button>
    //                     </DialogActions>
    //                 </Dialog>
    //             </Grid>
    //         </Grid>
    //         <Grid item>
    //             <Query />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </div>
  );

}