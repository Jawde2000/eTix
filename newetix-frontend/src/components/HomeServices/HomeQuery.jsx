import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Typography, TextField, Box, Button, Autocomplete, Toolbar } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

import SearchIcon from '@mui/icons-material/Search';
// import Locations from './../globalAssets/scripts/strings';
import images from '../globalAssets/scripts/bgchange';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, findRoute, vendorList, getAllRoutes, customerDetails } from '../../state/actions/actions';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import moment from 'moment';


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

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var tomorrow = moment().add(1, 'days').format(moment.HTML5_FMT.DATE);
  var yyyy = today.getFullYear();
  const todayDate = yyyy + '-' + mm + '-' + dd;

  console.log(todayDate)


  var history = useHistory();

  async function process(from, to){
      dispatch(findRoute(from, to, departureDate))
  }

  const [emptyFrom, setEmptyFrom] = useState(false);
  const [emptyTo, setEmptyTo] = useState(false);
  const [emptyDate, setEmptyDate] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if(!from){
      setEmptyFrom(true);
      return;
    }
    if(!to){
      setEmptyTo(true);
      return;
    }
    if(departureDate === null){
      setEmptyDate(true);
      return;
    }
    process(from, to)
    history.push(`/routes/${from}/${to}/${departureDate}`);
  }

  const handleFromInputChange = (event, value) =>  {
    setFrom(value);
  }

  const handleToInputChange = (event, value) => {
    setTo(value)
  }

  const DialogFromEmpty = () => {
    const handleClose = () => {
      setEmptyFrom(false);
    };

    return (
      <Toolbar>
        <Dialog
          open={emptyFrom}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography>Please enter departure state</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus style={{color: 'green'}}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    );
  }

  const DialogToEmpty = () => {
    const handleClose = () => {
      setEmptyTo(false);
    };

    return (
      <Toolbar>
        <Dialog
          open={emptyTo}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography>Please enter arrival state</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus style={{color: 'green'}}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    );
  }

  const DialogDateEmpty = () => {
    const handleClose = () => {
      setEmptyDate(false);
    };

    return (
      <Toolbar>
        <Dialog
          open={emptyDate}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography>Please enter departure Date</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus style={{color: 'green'}}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    );
  }
  
  return (
        <Box className={classes.whole}>
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} className={classes.inside}>
            <Grid item className={classes.title}>
              <Typography variant="h4">lowest prices, best experiences</Typography>
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
                            inputProps={{
                              min: tomorrow,
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
                  {
                    emptyFrom?<DialogFromEmpty />:null
                  }
                  {
                    emptyTo?<DialogToEmpty />:null
                  }
                  {
                    emptyDate?<DialogDateEmpty />:null
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
  )
}

export default HomeQuery; 