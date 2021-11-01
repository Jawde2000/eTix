import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Typography, TextField, Box, Button, Autocomplete } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

import SearchIcon from '@mui/icons-material/Search';
import Locations from './../globalAssets/scripts/strings';
import images from '../globalAssets/scripts/bgchange';
import { useDispatch } from 'react-redux';
import { storeLookup } from '../../state/actions/actions';

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
    paddingBottom: '2.5%'
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

  const [to, setTo] = useState(Location[0]);
  const [from, setFrom] = useState(Location[0]);
  const [value, setValue] = useState([null, null]);
  var history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(storeLookup(from.label, to.label, value[0].toISOString().split('T')[0], value[1].toISOString().split('T')[0]))
    history.push('/routes')
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
                        disablePortal
                        value={from}
                        onChange={(event, newValue) => {
                          setFrom(newValue);
                        }}
                        id="fromCombobox"
                        options={Locations}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="From" />}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" spacing={6}>
                          <Grid item>
                            <Autocomplete
                              disablePortal
                              value={to}
                              onChange={(event, newValue) => {
                                setTo(newValue);
                              }}
                              id="toCombobox"
                              options={Locations}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="To" />}
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
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                              startText="Departure Date"
                              endText="Return Date"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                  <TextField {...startProps} />
                                  <Box sx={{ mx: 2 }}> to </Box>
                                  <TextField {...endProps} />
                                </React.Fragment>
                              )}
                            />
                          </LocalizationProvider>
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