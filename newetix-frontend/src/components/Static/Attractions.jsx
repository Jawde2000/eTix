import React from 'react'
import { Box ,Container, Grid, Typography, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

import images from '../globalAssets/scripts/bgchange';
import Locations from '../globalAssets/scripts/strings';

import JDT from '../globalAssets/images/attractions/jdt.jpg';
import KDN from '../globalAssets/images/attractions/kdn.jpg';
import NSDK from '../globalAssets/images/attractions/nsdk.jpg';
import PDR from '../globalAssets/images/attractions/pdr.jpg';
import PIK from '../globalAssets/images/attractions/pik.jpg';
import PP from '../globalAssets/images/attractions/pp.jpg';
import SDE from '../globalAssets/images/attractions/sde.jpg';
import THBK from '../globalAssets/images/attractions/thbk.jpg';
import WPKL from '../globalAssets/images/attractions/wpkl.jpg';
import SG from '../globalAssets/images/attractions/sg.jpg';
import THHY from '../globalAssets/images/attractions/thhy.jpg';
import MLK from '../globalAssets/images/attractions/mlk.jpg';
import MON from '../globalAssets/images/attractions/mon.jpg';
import LIY from '../globalAssets/images/attractions/liy.png';
import DRA from '../globalAssets/images/attractions/dra.jpg';
import INA from '../globalAssets/images/attractions/ina.png';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${images()})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        minHeight: 500
    },
    title: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3), 
        fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 200,
    },
    serviceName: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        textAlign: 'center',
        color: '#F5CB5C'
    },
    cardContent: {
        backgroundColor: 'rgb(36,36,35)'
    },
}));

function Repeat(classes) {
    const stateCodes = [JDT, KDN, NSDK, PDR, PIK, PP, SDE, THBK, WPKL, SG, THHY, MLK, MON, LIY, DRA, INA];
    const stateNames = ['Johor', 'Kelantan', 'Negeri Sembilan', 'Perak', 'Perlis', 'Penang', 'Selangor', 'Bangkok, TH', 'Kuala Lumpur', 'Singapore', 'Hat Yai, TH', 'Malacca', 'Mondstadt', 'Liyue', 'Dragonspine', 'Inazuma'];

    return stateCodes.map((e, i) =>
        <Grid item xs={12} sm={4} lg={3}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    component="img"
                    alt="location img"
                    height="140"
                    image={stateCodes[i]}
                    title="location img"
                    />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                        {stateNames[i]}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export const Attractions = () =>{
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Typography className={classes.title} component="div">
                <Box textAlign ='center' m={1} fontSize="h6.fontSize">
                Popular Attractions
                </Box>
            </Typography>
            <Grid container spacing={3}>
                {Repeat(classes)}
            </Grid>
        </Container>
    )
}

export default Attractions;