import React, {useState, useEffect, useRef} from 'react'
import { makeStyles, withStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Toolbar, Button, Alert, Paper, Avatar, CircularProgress, Tooltip, Divider,InputLabel, Select, MenuItem, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, IconButton } from '@mui/material'
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { customerDetails, paymentSuccess, removeItem, viewCartData, getAllRoutes } from '../../state/actions/actions'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { routeLookupReducer } from '../../state/reducers/routeReducers';
import {DELETE_CART_RESET, CART_VIEW_RESET} from '../../state/actions/actionConstants';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StoreIcon from '@mui/icons-material/Store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import ufoCartoon from './nothing_here.png';
import night from './night.jpg';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
    //   backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    nightNothing: {
        backgroundColor: 'white',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: ['rubik', 'sans-serif'].join(',')
      },
    inside: {
      paddingTop: '2.5%',
      paddingBottom: '2.5%',
      paddingLeft: 40,
    },
    sect: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'white'
    },
    cartItems: {
        width: '400px',
        paddingBottom: '25px'
    },
    tf: {
        width: '550px'
    }, 
    customTable: {
        "& .MuiTableCell-sizeSmall": {
          padding: "6px 8px 6px 16px" // <-- arbitrary value
        }
    },
}));

export const seatIdentifier = (seatType) => {
    if (seatType == 'F') {
        return 'First Class'
    } else if (seatType == 'B') {
        return 'Business Class'
    } else if (seatType == 'E') {
        return 'Economy Class'
    }

    return 'null'
}

function NewCart() {
    const paypal = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const clist = useSelector(state => state.viewCartData);
    const cuslist = useSelector(state => state.customerDetails);
    const allr = useSelector(state => state.getAllRoutes);
    const RemoveItem = useSelector(state => state.removeItem);
    const userLogin = useSelector(state => state.userLogin);
    const {success: successDelete} = RemoveItem;
    const cartAdd = useSelector(state => state.cartAdd);
    const {loading: addLoading, success: addSuccess} = cartAdd;
    const {cartData} = clist;
    const {customerInfo} = cuslist;
    const {route, loading: loadingRoute} = allr;
    const {userInfo} = userLogin;
    const [cartItems, setcartItems] = useState();
    const [filteredcartData, setfilteredcartData] = useState();
    const [address, setAddress] = useState(null);
    const [serviceList, setServiceList] = useState(null);
    const [total, setTotal] = useState(0);
    const [payment, setPayment] = useState(0);
    const [cartID, setCartID] = useState('');
    const [ready, setReady] = useState(false);
    const [selected, setSelect] = useState(false);
    const [deleteAll, setDeleteAll] = useState();
    const [openDia, setOpenDia] = useState(false);
    const [open, setOpen] = useState(false);
    const [back, setBack] = useState(false);

    useEffect(() => {
        if(userInfo) {
            dispatch(getAllRoutes());
            dispatch(customerDetails());
        }       
    }, [successDelete, addSuccess])

    useEffect(() => {
        setDeleteAll(cartItems);
        // console.log(deleteAll);
    }, [selected]);

    useEffect(() => {
        if(cartData){
            if(filteredcartData){
                if(Object.keys(filteredcartData).length > 0){
                    setBack(true);
                }else{
                    setBack(false);
                }
            }
        }
    }, [cartData, filteredcartData])

    // useEffect(() => {
    //     if(cartData === 0){
    //         setcartItems(0);
    //     }
    //     if(cartData){
    //         dispatch(viewCartData());
    //     }
    // }, [cartData])

    useEffect(() => {
        if(successDelete) {
            dispatch({type: DELETE_CART_RESET})
            dispatch({type: CART_VIEW_RESET})
        }
    }, [successDelete])
    
    useEffect(() => {
        let totaltemp = 0

        let cd = [];
        if (cartData){
            setcartItems(cartData)
            for (let i in cartData){
                totaltemp = parseFloat(cartData[i].seat_price) + parseFloat(totaltemp)
            }
            setTotal((parseFloat(totaltemp)).toFixed(2))

            // console.log(cartData);
            
            if (!cartItems){
                setReady(false)
            } else {
                if (cartItems === 0){                  
                    setCartID(cartItems[0].cart);
                    console.log(cartItems[0].cart);
                }
                setReady(true);
            }

            if (route) {
                for (let i in cartData){
                    for (let j in route) {
                        if (cartData[i].service == route[j].serviceID){
                            let r = route[j];
                            r = {...r, seat_Type: cartData[i].seat_Type};
                            r = {...r, price: cartData[i].seat_price};
                            r = {...r, serviceStartDate: route[j].serviceStartDate};
                            r = {...r, cartID: cartData[i].cartItemsID};
                            r = {...r, vendor: route[j].vendor};
                            cd.push(r);
                        }
                    }
                }
                setfilteredcartData(cd)
            }
        }

        if (customerInfo) {
            setAddress(customerInfo.customerAddress)
        }
        
        // if (!cuslist.loading && !(customerInfo)) {
        //     history.push('/')
        // }

        if (route) {
            setServiceList(route)
        }
    }, [cartData, route, customerInfo])

    const handleRemove = (itemID) => {
        dispatch(removeItem(itemID));
    }

    const handleSuccess = () => {
        dispatch(paymentSuccess(cartID,total))
        history.push('/cart/payment/success')
    }

    const handleFailure = (err) => {
        alert("Payment failure, this is most likely to be a problem with your banking details, please check with PayPal")
        console.log(err)
    }

    // useEffect(() => {
    // if (ready){
    //     window.paypal.Buttons({
    //         createOrder: (data, actions) => {
    //           return actions.order.create({
    //             intent: "CAPTURE",
    //             purchase_units: [
    //               {
    //                 description: "eTix Ticket",
    //                 amount: {
    //                   currency_code: "MYR",
    //                   value: (total),
    //                 },
    //               },
    //             ],
    //           });
    //         },
    //         onApprove: async (data, actions) => {
    //             handleSuccess()
    //         },
    //         onError: (err) => {
    //             handleFailure(err)
    //         },
    //     }).render(paypal.current);
    // }

    // }, []);

    const getTime = (time) => {
        if(userInfo){
            var timeString = time; // input string
            var arr = timeString.split(":"); // splitting the string by colon
            var suffix = arr[0] >= 12 ? " PM":" AM";
            var t = arr[0] + ":" + arr[1] + suffix;
            return t;
        }
    }

    const MouseOver = (event) => {
        event.target.style.color = 'red';
    }

    const MouseOut = (event) => {
        event.target.style.color="";
    }

    const handleSelected = (event) => {
        setSelect(event.target.checked);
    };

    const DialogDelete = () => {
        const handleClose = () => {
          setOpen(false);
        };
      
        const handleDelete = () => {
            for(var i = 0;i < Object.keys(deleteAll).length; i++){
                dispatch(removeItem(deleteAll[i].cartItemsID));
            }
            setDeleteAll([]);
            setOpen(false);
        }
      
        return (
          <Toolbar>
            <Dialog
              open={open}
              // onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete all the tickets?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{color: "red"}} onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
      }

    return (
        <Box className={!back?classes.nightNothing:classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.inside}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <ShoppingCartIcon fontSize='large' sx={{fontSize: '55px'}} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">Cart</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.cartItems}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={6}>
                                <Grid item>
                                    <Grid container direction='column' justifyContent="center" alignItems="center" spacing={4}>
                                        <Grid item>
                                            <Typography variant="h4" sx={{color: 'rgb(245, 203, 92)'}}>Total</Typography>
                                            <Typography variant="h4" sx={{color: 'rgb(245, 203, 92)'}}>RM {total}</Typography>
                                            <Typography variant="h8" sx={{color: 'rgb(245, 203, 92)'}}>Total includes 6% SST <br /> and 1% eTix Charge</Typography>
                                        </Grid>
                                    
                                
                                        {address?
                                            <Grid item sx={{marginLeft: '15px', paddingRight: '150px'}}>
                                                <Typography align="left" variant="h6">Address: </Typography>
                                                <Typography align="left" variant="h6">{address}</Typography>
                                            </Grid>

                                        :
                                            <Alert severity="error" sx={{marginLeft: '35px', width: '350px'}}>Important info is missing, please go to your profile to provide them!</Alert>
                                        }
                                    </Grid>
                                </Grid>
                                {address?
                                    <Grid item>
                                        <div ref={paypal} sx={{width: '90%'}}/>
                                    </Grid>
                                :
                                    ''
                                }
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} paddingLeft={10}>
                    {
                    filteredcartData?
                    Object.keys(filteredcartData).length > 0?
                    <Grid xs={12} container>
                    <TableContainer component={Paper}>
                    <TableHead className={classes.customTable}>
                        <TableRow>
                            <TableCell />
                            <TableCell padding="checkbox">
                            <Tooltip title="Select all ticket?">
                            <Checkbox
                            checked={selected}
                            onChange={handleSelected}
                            />
                            </Tooltip>
                            </TableCell>
                            {selected?<TableCell padding="Delete">
                            <Tooltip title="Delete all ticket?">
                            <IconButton>
                            <DeleteOutlineSharpIcon onClick={() => {setOpen(true)}} style={{cursor: 'pointer'}} onMouseOver={MouseOver} onMouseOut={MouseOut}/>
                            </IconButton>
                            </Tooltip>
                            </TableCell>:null
                            }
                            <TableCell style={{fontSize: 20}}>Ticket</TableCell>
                        </TableRow>
                    </TableHead>
                    </TableContainer>
                    </Grid>
                    :
                    <Grid item xs={12} container direction="row" spacing={1} alignItems={'center'} justify={'center' }style={{ width: "100%" }}>
                        <Grid xs={12} justifyContent='center' alignItems="center" textAlign="center" container justify="center">
                            <img src={ufoCartoon} />
                        </Grid>
                        <Grid xs={12} justifyContent='center' alignItems="center" textAlign="center" container justify="center">
                            <Typography style={{fontSize: 30, color: 'gray'}}>
                                Your cart is empty
                            </Typography>
                        </Grid>
                    </Grid>
                    :
                    null
                    }
                    {
                        filteredcartData?
                        (
                            filteredcartData.map((item, index) => {
                                return (
                                    <div>
                                    <Grid item xs={12} container style={{background: 'white', marginTop: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                                        <TableContainer component={Paper}>
                                            <TableHead className={classes.customTable}>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell padding="checkbox">
                                                        <Checkbox 
                                                        checked={selected}
                                                        />
                                                    </TableCell>
                                                <TableCell>
                                                <Typography style={{fontSize: 16, display: 'flex'}}>
                                                <StoreIcon />{item.vendorD.vendorName}
                                                </Typography>
                                                </TableCell>
                                                <TableCell width='65%'>
                                                </TableCell>
                                                <TableCell>
                                                <Typography style={{fontSize: 16, display: 'flex'}}>
                                                    Action
                                                </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12} container style={{background: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                        <Grid item xs={3}>
                                            <Avatar variant="square"
                                            src={`https://etixbucket.s3.amazonaws.com/etix/${item.vendor}.png`}
                                            alt={`serviceLogo${item.vendor}`}
                                            style={{margin: 5, height: 125, width:180,}}
                                            >

                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={7} container style={{color: 'black', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                            <Grid item xs={12} >
                                                <Typography style={{fontSize: 20}}>
                                                    {`${item.servicedepartureTerminal} - ${item.servicearrivalTerminal}`}
                                                </Typography>
                                                <Typography style={item.serviceStatus === 'O'?{color: 'green', fontWeight: 'bolder'}:{color: 'red', fontWeight: 'bolder'}} display="flex">
                                                Status : {item.serviceStatus==='O'?"Active":"Not Available"}
                                                </Typography>   
                                                <Typography style={{fontSize: 15}}>
                                                Class: {seatIdentifier(item.seat_Type)}
                                                </Typography>  
                                                <Typography style={{fontSize: 15}}>
                                                Price: RM{item.price}
                                                </Typography>       
                                            </Grid>
                                            {/* <Grid item xs={12} container>
                                                <Grid item xs={12} style={{textAlign: 'right'}} >
                                                    Service ID
                                                    <Typography style={{fontSize: 40}} >
                                                        {`${item.serviceID}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid> */}
                                            <Grid item xs={12} container>
                                                <Grid item xs={12}  container>
                                                    <Grid item xs={12} display="flex">
                                                        <Typography style={{fontSize: 15}}>
                                                            {`Depart Time : ${getTime(item.serviceTime)}`}
                                                        </Typography>
                                                        <Typography style={{fontSize: 15}}>
                                                            {` | Depart Date : ${item.serviceStartDate}`}
                                                        </Typography>
                                                    </Grid> 
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} container direction="row" spacing={1} alignItems={'center'} justify={'center' }style={{ width: "100%" }}>
                                            <Grid xs={12} justifyContent='center' alignItems="center" textAlign="center" container justify="center">
                                            <Tooltip title="Remove Cart">
                                                <IconButton>
                                                <HighlightOffIcon onClick={() => {handleRemove(item.cartID)}} style={{cursor: 'pointer'}} onMouseOver={MouseOver} onMouseOut={MouseOut}/>
                                                </IconButton>
                                            </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </div>
                                )
                            })              
                        )
                        :
                        (
                            null
                        )
                        
                    }
                    {
                        open?<DialogDelete />:null
                    }
                    {
                        successDelete?
                        <Box sx={{ display: 'flex' }}>
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                        <CircularProgress  style={{color: '#F5CB5C'}}/>    
                        </Backdrop>
                        </Box>
                        :
                        null
                    }
                    {
                        loadingRoute?
                        <Box sx={{ display: 'flex' }}>
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                        <CircularProgress  style={{color: '#F5CB5C'}}/>    
                        </Backdrop>
                        </Box>
                        :
                        null
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default NewCart
