import React, {useState, useEffect} from 'react'
import { Box ,Container, Grid, Typography } from '@mui/material'

import { makeStyles } from '@mui/styles'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import images from '../globalAssets/scripts/bgchange';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${images})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        minHeight: 500
    },
}));

export const RouteQuery = () =>{
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container spacing={3} justify="center" direction="column">
                <Grid item xs={12} className={classes.sortByDate} container>
                    <Grid item xs={1} sm={1}>
                        <NavigateBeforeIcon style={{fontSize:100, }}/>
                    </Grid>
                    <Grid item xs={10} sm={10} style={{backgroundColor:'grey'}} container>
                        {/* Write the little box here */}
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <NavigateNextIcon style={{fontSize:100, }}/>
                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={4}>
                    <Grid item direction="column" xs={2} container>
                        <Grid item>
                            afwaf1111111aaa
                        </Grid>
                        <Grid item>
                            afwaf22222
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        afwaf1111
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}


export default RouteQuery;
