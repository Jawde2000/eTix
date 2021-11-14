import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Typography, TextField, Box, Button, Autocomplete } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

import SearchIcon from '@mui/icons-material/Search';
// import Locations from './../globalAssets/scripts/strings';
import images from '../globalAssets/scripts/bgchange';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, findRoute, vendorList, getAllRoutes } from '../../state/actions/actions';


const homeStyles = makeStyles((theme) => ({
  whole: {
    backgroundImage: `url(${images()})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "lighten",
    minHeight: 700,
    fontFamily: ['rubik', 'sans-serif'].join(',')
  },
  inside: {
    paddingTop: '2.5%',
    paddingBottom: '5%'
  },
  title: {
    paddingTop: '5%',
    paddingBottom: '2.5%',
  },
  queryFunc: {
    backgroundColor: 'rgba(247, 213, 124, 0.9)',
    padding: '7.5%',
    borderRadius: '25px'
  }
}));

function HomeQuery() {
  const classes = homeStyles();
  const dispatch = useDispatch()

  const locationList = useSelector(state => state.locationList)
  const {locations} = locationList

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [departureDate, setDepartureDate] = useState(null)

  useEffect(() => {
      dispatch(getLocations())
      dispatch(vendorList())
      dispatch(getAllRoutes())
  }, [])


  var history = useHistory();

  async function process(from, to){
      dispatch(findRoute(from, to, departureDate))
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(departureDate === null){
      alert("Please pick a date of departure");
      return;
    }
    process(from, to)
    history.push(`/routes/${from}/${to}`);
  }

  const handleFromInputChange = (event, value) =>  {
    setFrom(value);
  }

  const handleToInputChange = (event, value) => {
    setTo(value)
  }
  
  return (
        <Box className={classes.whole}>
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} className={classes.inside}>
            <Grid item className={classes.title}>
              <Typography variant="h4">lowest prices, high experiences</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" className={classes.queryFunc}>
                <Grid item>
                  <Grid container direction="column" justifyContent="flex-start" alignItems="baseline" spacing={1}>
                    <Grid item>
                      <Autocomplete
                        id="fromCombobox"
                        options={locations}
                        getOptionLabel={(option) => option.locationName}
                        style={{width:300}}
                        onInputChange={handleFromInputChange}
                        renderInput={params => (
                          <TextField {...params} label="From" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" spacing={6}>
                          <Grid item>
                            <Autocomplete
                              id="toCombobox"
                              options={locations}
                              getOptionLabel={(option) => option.locationName}
                              style={{width:300}}
                              onInputChange={handleToInputChange}
                              renderInput={params => (
                                <TextField {...params} label="To" variant="outlined" />
                              )}
                            />
                          </Grid>
                          <Grid item>
                            <Button variant="contained" onClick={handleSubmit}><SearchIcon></SearchIcon> Search</Button>
                          </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" spacing={1}>
                        <Grid item>
                          <TextField 
                            id="departD" 
                            variant="outlined"
                            onChange={(e) => setDepartureDate(e.target.value)}
                            defaultValue={departureDate}
                            margin="dense"
                            type="date"
                            required
                            size="small"
                            InputProps={{
                              style: {fontFamily: ['rubik', 'sans-serif'].join(','),}                        
                            }}                                             
                          />                       
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid item>
                        <Typography variant="p">• routes may not be available and depends on the vendors serving those routes</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="p">• eTix will try to serve you at the best itinerary possible</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
  )
}

export default HomeQuery; 