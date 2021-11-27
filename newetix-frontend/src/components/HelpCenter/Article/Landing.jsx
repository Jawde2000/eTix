import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';
import images from '../../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import Art1 from './Art1'
import Art2 from './Art2'
import Art3 from './Art3'
import Art4 from './Art4'
import ArtLanding from './ArtLanding'

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    inside: {
      paddingTop: '2.5%',
      paddingBottom: '2.5%'
    },
    sect: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'white'
    },
    articles: {
        width: '350px',
        height: '550px'
    },
    tf: {
        width: '550px'
    }
}));

function Landing() {
    const classes = useStyles();
    let history = useHistory()
    const [artShow, setShow] = React.useState(true)
    const [art1, set1] = React.useState(false)
    const [art2, set2] = React.useState(false)
    const [art3, set3] = React.useState(false)
    const [art4, set4] = React.useState(false)

    return (
        <Box className={classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.inside}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <HelpIcon fontSize='large' sx={{fontSize: '75px'}}></HelpIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">Help Center</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.articles}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={6}>
                                <Grid item></Grid>
                                <Grid item>
                                    <Typography variant="h5" style={{cursor: 'pointer'}} onClick={(() => {set1(true); set2(false); set3(false); set4(false); setShow(false)})}>How to purchase?</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" style={{cursor: 'pointer'}} onClick={(() => {set1(false); set2(true); set3(false); set4(false); setShow(false)})}>How to find routes?</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" style={{cursor: 'pointer'}} onClick={(() => {set1(false); set2(false); set3(true); set4(false); setShow(false)})}>Payments</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" style={{cursor: 'pointer'}} onClick={(() => {set1(false); set2(false); set3(false); set4(true); setShow(false)})}>Digital tickets</Typography>
                                </Grid>
                                <Grid item></Grid>
                                <Grid item>
                                    <Typography variant="h4" style={{cursor: 'pointer'}} onClick={(() => {history.push('/help')})}>Messaging System</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    {artShow?
                        <ArtLanding />
                    :
                        <>
                            {art1? <Art1 /> : <></>}
                            {art2? <Art2 /> : <></>}
                            {art3? <Art3 /> : <></>}
                            {art4? <Art4 /> : <></>}
                        </>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default Landing
