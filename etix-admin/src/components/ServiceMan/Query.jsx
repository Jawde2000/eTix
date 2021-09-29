import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, TextField, Button, Paper } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url("https://cdn.discordapp.com/attachments/885034816087683072/885035160016396329/20140625233054-09abeddb-me.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    inside: {
      paddingTop: '5%',
      paddingBottom: '5%'
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
        width: '250px'
    },
    boxContent: {
        backgroundColor: '#ccd9d5'
    }
}));

var serviceID = 6
var vendorName = 'SBS Transit Sdn Bhd'
var route = 'GOLDEN MILE COMPLEX, SG - TBS, KL'
var datetime = '1/10/2021 16:20'
var serviceStatus = 'ACTIVE'


function Query() {
    const classes = useStyles();
    return (
        <Box className={classes.whole}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4} className={classes.inside}>
                       <Grid item>
                            <TextField className={classes.tf} label="Body" variant="filled"/>
                       </Grid>
                       <Grid item>
                            <SearchRoundedIcon></SearchRoundedIcon>
                       </Grid>
                       <Grid item></Grid>
                       <Grid item></Grid>
                       <Grid item>
                            <PrintRoundedIcon></PrintRoundedIcon>
                       </Grid>
                       <Grid item></Grid>
                       <Grid item></Grid>
                       <Grid item>
                            <VisibilityRoundedIcon></VisibilityRoundedIcon>
                       </Grid>
                       <Grid item>
                            <EditRoundedIcon></EditRoundedIcon>
                       </Grid>
                       <Grid item>
                            <DeleteRoundedIcon></DeleteRoundedIcon>
                       </Grid>
                       <Grid item>
                            <AddCircleRoundedIcon></AddCircleRoundedIcon>
                       </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4} className={classes.inside}>
                        <Grid item>
                            <ArrowBackIosTwoToneIcon></ArrowBackIosTwoToneIcon>
                        </Grid>
                        <Grid item>
                            <Box className={classes.boxContent} sx={{paddingX: '125px', paddingY: '50px'}}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={4}>
                                    <Grid item>
                                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                            <Grid item>
                                                <Typography variant="h6">Vendor Logo</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img src='https://seekvectorlogo.com/wp-content/uploads/2018/06/sbs-transit-vector-logo.png' width='150px' alt="Vendor Logo" />
                                            </Grid>
                                            <Grid item></Grid>
                                            <Grid item>
                                                <Typography variant="h6">Last Updated</Typography>
                                                <Typography variant="h6">5/9/21 16:32</Typography>
                                                <Typography variant="h6">SBS0124</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
                                            <Grid item>
                                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="h6">Vendor Name</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField className={classes.tf} label={vendorName} variant="filled"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">DESTINATION</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="h6">Route</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField className={classes.tf} label={route} variant="filled"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">TIMING INFORMATION</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="h6">Date/Time</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField className={classes.tf} label={datetime} variant="filled"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="h6">Status</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField className={classes.tf} label={serviceStatus} variant="filled"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item>
                            <ArrowForwardIosRoundedIcon></ArrowForwardIosRoundedIcon>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Query
