import {  Grid, Box,  Link, Typography, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState} from 'react';
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Locations from './../globalAssets/scripts/strings';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLookup } from '../../state/actions/actions';
import Query from './Query'


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
  const defaultStyle = useStyles();
  let history = useHistory()
  const lookupDetails = useSelector(state => state.storeLookup)

  var from = lookupDetails.locationFrom, to = lookupDetails.locationTo, dateDeparture = lookupDetails.dateDeparture, dateReturn = lookupDetails.dateReturn
  const [loc, setLocation] = useState(Location[0]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const handleClickOpen = (e) => {
    console.log(e.target.id)
    if (e.target.id === 'from'){
        setLocation(lookupDetails.locationFrom)
    } else if (e.target.id === 'to'){
        setLocation(lookupDetails.locationTo)
    }

    setOpen(true);
  };

  const handleLocationChange = () => {

  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <Grid container className={defaultStyle.whole}>
          <Grid xs={12} spacing={4} direction="column" container justify="center" alignItems="center" alignContent="center">
            <Grid xs={12} sm={2} item>
                <Grid container justifyContent="space-between" direction="row" className={defaultStyle.breadcrumbgrid}>
                    <Breadcrumbs aria-label="breadcrumb" className={defaultStyle.breadcrumb}>
                        <Typography>
                            eTix Route Search
                        </Typography>
                        <Typography id='from' onClick={handleClickOpen}>
                            {from} ({dateDeparture})
                        </Typography>
                        <Typography id='to' onClick={handleClickOpen}>
                            {to} ({dateReturn})
                        </Typography>
                    </Breadcrumbs>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Change Location and Date</DialogTitle>
                        <DialogContent>
                            <Autocomplete
                                disablePortal
                                value={loc}
                                onChange={(event, newValue) => {
                                setLocation(newValue);
                                }}
                                id="locCombobox"
                                className={defaultStyle.ac}
                                options={Locations}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Location" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleLocationChange}>Change</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
            <Grid item>
                <Query />
            </Grid>
          </Grid>
        </Grid>
      </div>
  );

}