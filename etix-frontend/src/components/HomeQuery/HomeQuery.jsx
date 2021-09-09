import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './fonts.css';



const useStyles = makeStyles((theme) => ({
  whole: {
    backgroundImage: `url("https://cdn.discordapp.com/attachments/885034816087683072/885035160016396329/20140625233054-09abeddb-me.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "rgba(255,255,255,0.5)",
    backgroundBlendMode: "lighten"

  }
}));

function homeQuery() {
  const classes = useStyles();
  return (
    <Box className={classes.whole}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">the best prices, at every time</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={8}>
            <Grid item>
            <Grid container direction="column" justifyContent="flex-start" alignItems="baseline" spacing={1}>
            <Grid item>
              <TextField id="filled-basic" label="From" variant="filled" required/>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={6}>
                <Grid item>
                  <TextField id="filled-basic" label="To" variant="filled" required/>
                </Grid>
                <Grid item>
                  <Button variant="contained"><SearchIcon></SearchIcon> Search</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <TextField id="filled-basic" label="Departure Date" variant="filled" required/>
                </Grid>
                <Grid item>
                  <TextField id="filled-basic" label="Arrival Date" variant="filled" />
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
            <Grid item>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item>
                  <img src="https://csrworks.com/wp-content/uploads/2018/06/Black-Box.png" width="250px" alt="ad"/>
                </Grid>
                <Grid item>
                  <Typography variant="p">SomethingSomethingSomethingSomethingSomething</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    </Box>
)}

export default homeQuery; 