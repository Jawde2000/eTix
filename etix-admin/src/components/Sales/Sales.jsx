import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { listPayment } from '../../actions/salesActions';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: `url("https://cdn.discordapp.com/attachments/885034816087683072/885035160016396329/20140625233054-09abeddb-me.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(','),
        minHeight: 500,
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

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const paymentList = useSelector(state => state.paymentList)
    const {payments} = paymentList

    let history = useHistory()

    var totalAmount = 0.00;
    const [total, setTotal] = useState();
    const [vendorTotal, setVendorTotal] = useState();
    const [nettIncome, setNettIncome] = useState();
    const [serviceTax, setServiceTax] = useState();
    const [updatePayment, setUpdatePayment] = useState();
    const [filterData, setFilterData] = useState();

    useEffect(() => {
        if(userInfo){
            dispatch(listPayment());
        }
        else{
            history.push('/');
        }
    }, [userInfo])

    useEffect(() => {
        if(payments){
            setUpdatePayment(payments)
        }
    }, [payments])

    useEffect(() => {
        if(updatePayment){
            for(let i of updatePayment){
                totalAmount += parseFloat(i.cartDetails.cartTotal);
            }
            setTotal(totalAmount.toFixed(2));
        }
    }, [updatePayment])

    useEffect(() => {
        if(total){
            let vendorInc = total- (total*6/100) - (total*1/100);
            let tax = total * 6 / 100;
            let income = total * 1 / 100;
            setVendorTotal(vendorInc.toFixed(2))
            setServiceTax(tax.toFixed(2))
            setNettIncome(income.toFixed(2))
        }
    }, [total])

    useEffect(() => {
        if(value){
            if(updatePayment){
                const filteredData = updatePayment.filter(data => new Date(data.paymentDateTime) >= new Date(value[0]) && new Date(data.paymentDateTime) <= new Date(value[1]))
                setFilterData(filteredData);
                console.log(filteredData);
            }
        }
    }, [value])

    useEffect(() => {
        if(filterData){
            let totalAM = 0.00;
            for(let i of filterData){
                totalAM +=parseFloat(i.cartDetails.cartTotal);
            }
            setTotal(totalAM.toFixed(2));
        }
    }, [filterData])



    return (
        <Box className={classes.whole}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>
                    <Typography variant="p">Configure billing cycle</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Starting"
                            endText="Ending Before"
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
                                <Typography variant="h3">RM {vendorTotal}</Typography>
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
                                <Typography variant="h3">RM {serviceTax}</Typography>
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
                                <Typography variant="h3">RM {nettIncome}</Typography>
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
                                    <Link to="/sales/datageneration" style={{color: '#66FCF1', textDecoration: "none"}}>
                                        <Typography variant="h6">View Data</Typography>
                                    </Link>
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
