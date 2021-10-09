import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, TextField} from '@material-ui/core';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: `url("https://cdn.discordapp.com/attachments/885034816087683072/885035160016396329/20140625233054-09abeddb-me.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    icons: {
        width: '120px',
        height: '120px'
    },
    dgen: {
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '80px',
        paddingRight: '80px',
        backgroundColor: '#1F2833',
        color: '#66FCF1'
    }
}));

function Sales() {
    const classes = useStyles();
    const [value, setValue] = React.useState([null, null]);

    return (
        <Box className={classes.whole}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>
                    <Typography variant="p">Configure billing cycle</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Starting"
                            endText="Ending"
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
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
                        <Grid item><MonetizationOnIcon sx={{width: '75px', height: '75px'}}></MonetizationOnIcon></Grid>
                        <Grid item><Grid container direction="column" justifyContent="center" alignItems="flex-start">
                            <Grid item>
                                <Typography variant="h5">Revenue from Vendors</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3">RM 10000.00</Typography>
                            </Grid>
                        </Grid></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item><GavelIcon sx={{width: '75px', height: '75px'}}></GavelIcon></Grid>
                        <Grid item><Grid container direction="column" justifyContent="center" alignItems="flex-start">
                            <Grid item>
                                <Typography variant="h5">Service Taxation (SST 6%)</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3">RM 4000.00</Typography>
                            </Grid>
                        </Grid></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
                        <Grid item><AccountBalanceIcon sx={{width: '75px', height: '75px'}}></AccountBalanceIcon></Grid>
                        <Grid item><Grid container direction="column" justifyContent="center" alignItems="flex-start">
                            <Grid item>
                                <Typography variant="h5">Net income</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3">RM 7900.00</Typography>
                            </Grid>
                        </Grid></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item></Grid>
                        <Grid item>
                            <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.dgen}>
                                <Grid item>
                                    <Typography variant="h5">Data Generation</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">by Service</Typography>
                                    <Typography variant="h6">by Customer</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item></Grid>
                <Grid item></Grid>
            </Grid>
        </Box>
    );
}

export default Sales
