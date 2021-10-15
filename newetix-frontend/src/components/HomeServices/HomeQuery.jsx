import React from 'react';

import { Grid, Typography, TextField, Box, Button, Autocomplete } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

import SearchIcon from '@mui/icons-material/Search';
import Locations from './../globalAssets/strings';
import moscow from '../globalAssets/moscow.jpg'

const homeStyles = makeStyles((theme) => ({
  whole: {
    backgroundImage: `url(${moscow})`,
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

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [value, setValue] = React.useState([null, null]);


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
                        id="combo-box-demo"
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
                              id="combo-box-demo"
                              options={Locations}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="To" />}
                            />
                          </Grid>
                          <Grid item>
                            <Button variant="contained"><SearchIcon></SearchIcon> Search</Button>
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